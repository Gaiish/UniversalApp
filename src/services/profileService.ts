import { supabase } from "@/lib/supabase";
import { ProfileFormData } from "@/schemas/profile";

export function cleanProfileData<T extends Record<string, any>>(data: T): T {
  // Only remove nulls at top level (sufficient for this schema)
  return Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== null)) as T;
}

export async function fetchProfileById(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  return data ? cleanProfileData(data) : null;
}

export async function upsertProfileData(profile: ProfileFormData, userId: string) {
  const payload = { ...profile, id: userId };
  const { error } = await supabase
    .from("profiles")
    .upsert(payload, { onConflict: "id" });
  if (error) throw error;
  return true;
}
