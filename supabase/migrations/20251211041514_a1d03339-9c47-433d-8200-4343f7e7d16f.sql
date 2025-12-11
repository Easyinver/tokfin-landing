-- Block all direct inserts to agk_investment_requests
-- Only the edge function (using service role) can insert
DROP POLICY IF EXISTS "Authenticated users can submit investment requests" ON public.agk_investment_requests;
DROP POLICY IF EXISTS "Allow public insert on investment requests" ON public.agk_investment_requests;

-- No INSERT policy = no one can insert via client (service role bypasses RLS)