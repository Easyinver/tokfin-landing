-- Fix function search_path issues for security
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, device)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'first_name', 
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'device'
  );
  
  PERFORM tkcom.generate_user_invitation_codes(new.id);
  
  RETURN new;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_subscription_profile_id()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.profile_id IS NULL THEN
    NEW.profile_id := auth.uid();
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.increment_invites_sent()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.referred_by_id IS NOT NULL THEN
    UPDATE participants 
    SET invites_sent = invites_sent + 1,
        updated_at = NOW()
    WHERE id = NEW.referred_by_id;
    
    UPDATE participants
    SET level = (SELECT level + 1 FROM participants WHERE id = NEW.referred_by_id)
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$;

-- Remove overly permissive policy on users table if it still exists
DROP POLICY IF EXISTS "Enable all access to users table" ON public.users;