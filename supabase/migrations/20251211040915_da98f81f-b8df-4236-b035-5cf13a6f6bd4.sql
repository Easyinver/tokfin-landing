-- Fix remaining function search_path issues
CREATE OR REPLACE FUNCTION public.insertcitizensround0(num_ctzs integer DEFAULT 1000)
RETURNS void
LANGUAGE plpgsql
SET search_path = public
AS $function$
DECLARE
    i INTEGER;
BEGIN
    DELETE FROM citizens;
    
    FOR i IN 1..num_ctzs LOOP
        INSERT INTO citizens (name, membership_level, seg_level, cteam_rol, trust_score, wallet_tkf, wallet_tkfr, wallet_tkfe, wallet_fiat, round_joined)
        VALUES ('Citizen_' || i, 0, 0, 0, 0.5, 0, 0, 0, 0, 0);
    END LOOP;
END;
$function$;