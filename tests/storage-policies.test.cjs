const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { PGlite } = require(process.env.PGLITE_MODULE || '@electric-sql/pglite');

test('storage migration is repeatable and only an allowlisted administrator can upload', async () => {
  const db = new PGlite();
  const admin = '00000000-0000-0000-0000-000000000001';
  const outsider = '00000000-0000-0000-0000-000000000002';
  try {
    // Minimal Supabase schemas to exercise the actual SQL with PostgreSQL RLS.
    await db.exec(`
      create role anon;
      create role authenticated;
      create schema auth;
      create schema storage;
      create table auth.users (id uuid primary key, email text);
      create function auth.uid() returns uuid language sql stable as
        $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
      create function storage.foldername(text) returns text[] language sql immutable as
        $$ select (string_to_array($1, '/'))[1:array_length(string_to_array($1, '/'), 1)-1] $$;
      create table storage.buckets (id text primary key, name text, public boolean, file_size_limit bigint, allowed_mime_types text[]);
      create table storage.objects (bucket_id text references storage.buckets, name text);
      alter table storage.objects enable row level security;
      grant usage on schema public, auth, storage to anon, authenticated;
      grant select, insert, update, delete on storage.objects to anon, authenticated;
      insert into auth.users values ('${admin}', 'admin@example.test'), ('${outsider}', 'outsider@example.test');
    `);
    const sql = await fs.readFile(path.join(__dirname, '../supabase/product-images.sql'), 'utf8');
    await db.exec(sql);
    await db.exec(sql);
    await db.exec(`insert into public.product_image_admins values ('${admin}')`);
    const bucket = (await db.query('select * from storage.buckets')).rows[0];
    assert.equal(bucket.id, 'product-images');
    assert.equal(bucket.public, true);
    assert.equal(bucket.file_size_limit, 2097152);

    await db.exec('set role anon');
    await assert.rejects(db.exec("insert into storage.objects values ('product-images', 'products/anonymous.webp')"), /row-level security/);
    await db.exec(`reset role; set request.jwt.claim.sub = '${outsider}'; set role authenticated;`);
    await assert.rejects(db.exec("insert into storage.objects values ('product-images', 'products/outsider.webp')"), /row-level security/);
    await assert.rejects(db.exec(`insert into public.product_image_admins values ('${outsider}')`), /permission denied/);
    assert.equal((await db.query('select * from public.product_image_admins')).rows.length, 0);

    await db.exec(`reset role; set request.jwt.claim.sub = '${admin}'; set role authenticated;`);
    await db.exec("insert into storage.objects values ('product-images', 'products/allowed.webp')");
    await assert.rejects(db.exec("insert into storage.objects values ('product-images', 'other/denied.webp')"), /row-level security/);
    // No SELECT / DELETE / UPDATE policies: browser users cannot list, replace or delete files.
    assert.equal((await db.query('select * from storage.objects')).rows.length, 0);
    await db.exec('delete from storage.objects');
    await db.exec("update storage.objects set name = 'changed.webp'");
    await db.exec('reset role');
    assert.deepEqual((await db.query('select name from storage.objects')).rows, [{ name: 'products/allowed.webp' }]);
  } finally { await db.close(); }
});
