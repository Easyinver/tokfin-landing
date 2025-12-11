-- Fix agk_investment_requests security: require authentication for inserts
DROP POLICY IF EXISTS "Allow public insert on investment requests" ON public.agk_investment_requests;

-- Only authenticated users can submit investment requests
CREATE POLICY "Authenticated users can submit investment requests" 
ON public.agk_investment_requests 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Keep existing admin policies for read/update/delete
-- These are already secure (restricted to is_system_admin())