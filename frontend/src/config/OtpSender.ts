import { httpClient } from "../services/http";

export const sentUserOtp = async () => {
  const http = new httpClient();
  return await http.post("/api/auth/sent-otp", {});
};
