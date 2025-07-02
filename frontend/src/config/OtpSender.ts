import { httpClient } from "../services/http";

export const sentUserOtp = () => {
  const http = new httpClient();
  return http.post(http.authUrl + "/api/user/sent-otp", {});
};
