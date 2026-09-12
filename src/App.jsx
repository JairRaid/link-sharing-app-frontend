import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";

const App = () => {
  // useEffect(() => {
  //   const login = async () => {
  //     const url = "http://localhost:5000/api/auth/login";
  //     try {
  //       const response = await fetch(url, {
  //         method: "POST",
  //         credentials: "include", // <--- CRITICAL: Tells browser to receive & set the cookie
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           email: "jair@gmail.com",
  //           password: "12457955",
  //         }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("HTTP error! Status: " + response.status);
  //       }

  //       const d = await response.json();
  //       setData(d);
  //     } catch (error) {
  //       console.error("Fetch error: " + error);
  //     }
  //   };

  //   const getProfile = async () => {
  //     const url = "http://localhost:5000/api/user/profile";

  //     try {
  //       const response = await fetch(url, {
  //         method: "GET",
  //         credentials: "include", // <--- CRITICAL: Tells browser to receive & set the cookie
  //       });

  //       if (!response.ok) {
  //         throw new Error("HTTP error! Status: " + response.status);
  //       }

  //       const d = await response.json();
  //       setData(d);
  //       console.log(d);
  //     } catch (error) {
  //       console.error("Fetch error: " + error);
  //     }
  //   };

  //   // login();
  //   getProfile();
  // }, []);
  return <RouterProvider router={router} />;
};

export default App;
