import { useState } from "react";
import { createTopic } from "../../api/topic";

export function useCreateTopic(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateTopic = async (organization_id: string, title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);

    try {
      await createTopic({
        organization_id: Number(organization_id),
        title: trimmed,
      });

      if (onSuccess) onSuccess();
    } catch (e) {
      console.error("Topic creation failed:", e);
      setError("Failed to create topic.");
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateTopic, loading, error };
}
