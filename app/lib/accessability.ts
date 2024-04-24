import { supabase } from "./supabase";

const accessability = async () => {
   const isAdmin = await supabase.auth.getUser();
   if (isAdmin.data.user?.id === process.env.NEXT_PUBLIC_ID) {
       return true;
   } else {
       return false;
   }
}

export default accessability;
