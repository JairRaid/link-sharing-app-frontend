import { redirect } from "react-router";

export const verifySession = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/me", {
      method: "GET",
    });

    if (!response.ok) {
      return redirect("/login");
    }

    const userData = await response.json();
    console.log(userData);
  } catch (error) {
    console.error("Error to verify session: " + error);
  }
};
