-- Run once in the SQL Editor of project pnubnimuizpgprtkbcwk.
-- Existing product data remains in the current Apps Script backend.
begin;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = excluded.public,
  file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Product image admins can upload" on storage.objects;
-- The product-images Edge Function checks the existing admin password before
-- writing with its server-only service role. No direct browser writes.
-- Public bucket URLs can be read without a SELECT policy.
commit;
