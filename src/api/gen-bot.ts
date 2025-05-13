import { post } from "./apiClient";
import { docGenerationRequest, docGenerationResponse } from "../types/gen-bot";

export const generateDocument = async (
  data: docGenerationRequest
): Promise<docGenerationResponse> => {
  return post<docGenerationResponse, docGenerationRequest>("/gen-bot", data);
};
