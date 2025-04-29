import { useEffect, useState } from "react";
import { get } from "../api/apiClient";

interface UserData {
  id: string;
  name: string;
  email: string;
}

export const useUserData = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await get<UserData>("/user/profile"); // Adjust API endpoint if needed
        setUser(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
