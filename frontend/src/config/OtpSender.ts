import { httpClient } from "../services/http";

export const sentUserOtp = async () => {
  const http = new httpClient();
  return await http.post(http.authUrl + "/api/user/sent-otp", {});
};
