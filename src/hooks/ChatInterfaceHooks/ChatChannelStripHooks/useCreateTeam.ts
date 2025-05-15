import { createTeam } from "../../../api/team";

export const useCreateTeam = (onSuccess?: () => void) => {
  const handleCreateTeam = async (
    name: string,
    email: string,
    orgId: string
  ) => {
    try {
      await createTeam({
        name: name,
        email: email,
        organization_id: Number(orgId),
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Failed to create team:", error);
    }
  };

  return { handleCreateTeam };
};
