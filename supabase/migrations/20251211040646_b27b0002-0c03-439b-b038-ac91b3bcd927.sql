-- Fix users table RLS: only authenticated users can see their own data
DROP POLICY IF EXISTS "Enable all access to users table" ON public.users;

CREATE POLICY "Users can view own data" 
ON public.users 
FOR SELECT 
USING (auth.uid()::text = id::text OR is_system_admin());

CREATE POLICY "Users can update own data" 
ON public.users 
FOR UPDATE 
USING (auth.uid()::text = id::text);

CREATE POLICY "Users can insert own data" 
ON public.users 
FOR INSERT 
WITH CHECK (auth.uid()::text = id::text);

-- Fix citizens table RLS: restrict to aggregated/public simulation data only
-- Keep public read for now since it's simulation data, but consider restricting sensitive fields
-- For now, we'll allow read access but prevent modifications

DROP POLICY IF EXISTS "Public read simulation data" ON public.citizens;

-- Allow public read for simulation purposes (this is demo/simulation data)
-- If citizens contains real user data, this should be restricted
CREATE POLICY "Authenticated users can read simulation data" 
ON public.citizens 
FOR SELECT 
TO authenticated
USING (true);