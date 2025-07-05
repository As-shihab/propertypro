import { httpClient } from "../services/http";

const VerifyOtp = async (otp: string) => {
  const http = new httpClient();
  try {
    const response = await http.post(http.authUrl + "/api/user/verify-otp", { otp });
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
}