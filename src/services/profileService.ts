import { supabase } from "@/lib/supabase";
import { ProfileFormData } from "@/schemas/profile";
import { cleanProfileData } from "./utils";

export async function fetchProfileById(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  return data ? cleanProfileData(data) : null;
}

export async function upsertProfileData(
  profile: ProfileFormData,
  userId: string
) {
  const payload = { ...profile, id: userId };
  const { error } = await supabase
    .from("profiles")
    .upsert(payload, { onConflict: "id" });
  if (error) throw error;
  return true;
}
