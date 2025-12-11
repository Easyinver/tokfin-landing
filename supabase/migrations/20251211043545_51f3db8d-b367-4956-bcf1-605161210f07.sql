-- Add SELECT policy to restrict access to system admins only
CREATE POLICY "Only system admins can read contact messages" 
ON public.agk_contact_messages 
FOR SELECT 
USING (is_system_admin());

-- Add UPDATE policy for admins
CREATE POLICY "Only system admins can update contact messages" 
ON public.agk_contact_messages 
FOR UPDATE 
USING (is_system_admin());

-- Add DELETE policy for admins
CREATE POLICY "Only system admins can delete contact messages" 
ON public.agk_contact_messages 
FOR DELETE 
USING (is_system_admin());