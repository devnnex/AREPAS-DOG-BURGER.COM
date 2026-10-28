const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { PGlite } = require(process.env.PGLITE_MODULE || '@electric-sql/pglite');

test('storage migration is repeatable and blocks all direct browser writes', async () => {
  const db = new PGlite();
  try {
    // Minimal Supabase schemas to exercise the actual SQL with PostgreSQL RLS.
    await db.exec(`
      create role anon;
      create role authenticated;
      create role service_role bypassrls;
      create schema storage;
      create table storage.buckets (id text primary key, name text, public boolean, file_size_limit bigint, allowed_mime_types text[]);
      create table storage.objects (bucket_id text references storage.buckets, name text);
      alter table storage.objects enable row level security;
      grant usage on schema public, storage to anon, authenticated, service_role;
      grant select, insert, update, delete on storage.objects to anon, authenticated, service_role;
      create policy "Product image admins can upload" on storage.objects for insert to authenticated with check (true);
    `);
    const sql = await fs.readFile(path.join(__dirname, '../supabase/product-images.sql'), 'utf8');
    await db.exec(sql);
    await db.exec(sql);
    const bucket = (await db.query('select * from storage.buckets')).rows[0];
    assert.equal(bucket.id, 'product-images');
    assert.equal(bucket.public, true);
    assert.equal(bucket.file_size_limit, null);

    await db.exec('set role anon');
    await assert.rejects(db.exec("insert into storage.objects values ('product-images', 'products/anonymous.webp')"), /row-level security/);
    await db.exec('reset role; set role authenticated;');
    await assert.rejects(db.exec("insert into storage.objects values ('product-images', 'products/outsider.webp')"), /row-level security/);
    await db.exec('reset role; set role service_role;');
    await db.exec("insert into storage.objects values ('product-images', 'products/allowed.webp')");
    await db.exec('reset role; set role authenticated;');
    // No SELECT / DELETE / UPDATE policies: browser users cannot list, replace or delete files.
    assert.equal((await db.query('select * from storage.objects')).rows.length, 0);
    await db.exec('delete from storage.objects');
    await db.exec("update storage.objects set name = 'changed.webp'");
    await db.exec('reset role');
    assert.deepEqual((await db.query('select name from storage.objects')).rows, [{ name: 'products/allowed.webp' }]);
  } finally { await db.close(); }
});
