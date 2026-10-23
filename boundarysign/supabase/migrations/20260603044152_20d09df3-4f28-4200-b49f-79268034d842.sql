DROP POLICY IF EXISTS "Anyone upload submitted-photos" ON storage.objects;

CREATE POLICY "Anyone upload submitted-photos"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'submitted-photos'
  AND lower(storage.extension(name)) = ANY (ARRAY['jpg','jpeg','png','webp','heic','heif','gif'])
);