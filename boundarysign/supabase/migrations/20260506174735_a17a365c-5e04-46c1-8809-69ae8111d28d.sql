
-- 1. Photo submissions: drop public-approved SELECT exposing email
DROP POLICY IF EXISTS "Anyone can view approved photos" ON public.photo_submissions;

-- 2. Replace permissive INSERT policies with non-trivial CHECK
DROP POLICY IF EXISTS "Anyone can submit photos" ON public.photo_submissions;
CREATE POLICY "Anyone can submit photos" ON public.photo_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (approved = false AND length(name) > 0 AND length(photo_url) > 0);

DROP POLICY IF EXISTS "Anyone can submit bulk order" ON public.bulk_order_requests;
CREATE POLICY "Anyone can submit bulk order" ON public.bulk_order_requests
  FOR INSERT TO anon, authenticated
  WITH CHECK (length(name) > 0 AND length(email) > 0);

-- 3. user_roles: explicit admin-only INSERT/UPDATE/DELETE (prevent privilege escalation)
CREATE POLICY "Admins manage roles insert" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles update" ON public.user_roles
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles delete" ON public.user_roles
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 4. Storage: drop public LIST policies (public buckets still serve via direct URL)
DROP POLICY IF EXISTS "Public read site-images" ON storage.objects;
DROP POLICY IF EXISTS "Public read submitted-photos" ON storage.objects;
DROP POLICY IF EXISTS "Public read team-photos" ON storage.objects;

-- 5. Add admin-only UPDATE policy for submitted-photos bucket
CREATE POLICY "Admins update submitted-photos" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'submitted-photos' AND public.has_role(auth.uid(), 'admin'));

-- 6. Fix set_updated_at search_path
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$function$;

-- 7. Revoke EXECUTE on SECURITY DEFINER functions from anon/authenticated
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
