import { createClient } from "@supabase/supabase-js";
// Reusable supabase variable .  
export const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY as string
);