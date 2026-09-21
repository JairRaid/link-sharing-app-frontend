import { redirect } from "react-router";
import apiClient from "./apiClient";

export const verifySession = async () => {
  try {
    await apiClient.get("/api/auth/me");
    return null;
  } catch (error) {
    console.error("Error to verify session: " + error.message);
    throw redirect("/login");
  }
};
