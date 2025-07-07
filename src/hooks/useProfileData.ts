import { useCallback, useEffect, useState } from "react";
import { ProfileFormData } from "@/schemas/profile";
import { fetchProfileById, upsertProfileData } from "@/services/profileService";

interface UseProfileDataResult {
  profile: Partial<ProfileFormData> | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  upsertProfile: (data: ProfileFormData, userId: string) => Promise<void>;
}

export function useProfileData(userId?: string): UseProfileDataResult {
  const [profile, setProfile] = useState<Partial<ProfileFormData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProfileById(userId);
      setProfile(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const upsertProfile = useCallback(
    async (values: ProfileFormData, userId: string) => {
      setLoading(true);
      setError(null);
      try {
        await upsertProfileData(values, userId);
        await fetchProfile();
      } catch (e: any) {
        setError(e.message || "Failed to update profile");
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [fetchProfile]
  );

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, fetchProfile, upsertProfile };
}
