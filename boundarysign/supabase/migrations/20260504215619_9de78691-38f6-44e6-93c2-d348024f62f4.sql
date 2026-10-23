
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Auto-make first signup an admin
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  user_count INT;
BEGIN
  SELECT count(*) INTO user_count FROM auth.users;
  IF user_count = 1 THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Site content (key/value editable blocks)
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  title TEXT,
  body TEXT,
  image_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins can insert site content" ON public.site_content FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site content" ON public.site_content FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete site content" ON public.site_content FOR DELETE USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_content_updated BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.site_content (key, title, body) VALUES
  ('about_hero', 'OUR STORY', 'Boundary Sign was founded in 2025 with a simple mission: build the toughest, most legible boundary signage on the market. What started as a frustration with flimsy, fading signs on our own land became a small business committed to helping landowners protect what''s theirs. Edit this text from the admin dashboard to tell your real story.'),
  ('team_intro', 'MEET THE TEAM', 'The people behind Boundary Sign — landowners, makers, and outdoor enthusiasts who care about doing things the right way.');

-- Team members
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  photo_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read team" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Admins can insert team" ON public.team_members FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update team" ON public.team_members FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete team" ON public.team_members FOR DELETE USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER team_members_updated BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.team_members (name, role, bio, display_order) VALUES
  ('Founder Name', 'Founder & CEO', 'Add bio here. Edit from admin dashboard.', 1);

-- Bulk order requests
CREATE TABLE public.bulk_order_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  quantity TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.bulk_order_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit bulk order" ON public.bulk_order_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view bulk orders" ON public.bulk_order_requests FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete bulk orders" ON public.bulk_order_requests FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Photo submissions
CREATE TABLE public.photo_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  caption TEXT,
  photo_url TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.photo_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit photos" ON public.photo_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view approved photos" ON public.photo_submissions FOR SELECT USING (approved = true);
CREATE POLICY "Admins can view all photos" ON public.photo_submissions FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update photos" ON public.photo_submissions FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete photos" ON public.photo_submissions FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('team-photos', 'team-photos', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('submitted-photos', 'submitted-photos', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

CREATE POLICY "Public read team-photos" ON storage.objects FOR SELECT USING (bucket_id = 'team-photos');
CREATE POLICY "Admins manage team-photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'team-photos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update team-photos" ON storage.objects FOR UPDATE USING (bucket_id = 'team-photos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete team-photos" ON storage.objects FOR DELETE USING (bucket_id = 'team-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public read submitted-photos" ON storage.objects FOR SELECT USING (bucket_id = 'submitted-photos');
CREATE POLICY "Anyone upload submitted-photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'submitted-photos');
CREATE POLICY "Admins delete submitted-photos" ON storage.objects FOR DELETE USING (bucket_id = 'submitted-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public read site-images" ON storage.objects FOR SELECT USING (bucket_id = 'site-images');
CREATE POLICY "Admins manage site-images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update site-images" ON storage.objects FOR UPDATE USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete site-images" ON storage.objects FOR DELETE USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));
