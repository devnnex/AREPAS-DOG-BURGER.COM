-- Run once in the SQL Editor of project pnubnimuizpgprtkbcwk.
-- Existing product data remains in the current Apps Script backend.
begin;

create table if not exists public.product_image_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.product_image_admins enable row level security;
revoke all on public.product_image_admins from anon, authenticated;
grant select on public.product_image_admins to authenticated;

drop policy if exists "Image admins can read own membership" on public.product_image_admins;
create policy "Image admins can read own membership"
on public.product_image_admins for select to authenticated
using (user_id = (select auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = excluded.public,
  file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Product image admins can upload" on storage.objects;
create policy "Product image admins can upload"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'product-images'
  and (storage.foldername(name))[1] = 'products'
  and exists (select 1 from public.product_image_admins where user_id = (select auth.uid()))
);

-- No anonymous writes, overwrites, or client-side file deletion.
-- Public bucket URLs can be read without a SELECT policy.
commit;

-- After creating your administrator in Authentication > Users,
-- replace the email below and run these lines separately:
-- insert into public.product_image_admins (user_id)
-- select id from auth.users where email = 'TU_CORREO_ADMIN'
-- on conflict do nothing;
