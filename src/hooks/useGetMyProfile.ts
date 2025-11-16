import { useEffect, useState } from "react";
import { UsersService } from "../services/users.service";
import type { TypeUser } from "../types/user.types";

export const useGetMyProfile = () => {
  const [profile, setProfile] = useState<TypeUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      const { success, message, data } = await UsersService.getMyProfile();
      if (success && data) {
        setProfile(data);
      } else {
        setError(message);
        setProfile(null);
      }
      setLoading(false);
    };
    getProfile();
  }, []);

  return { profile, loading, error, setProfile };
}