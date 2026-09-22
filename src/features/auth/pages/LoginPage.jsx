import { useForm } from "react-hook-form";
import Button from "../../../components/ui/Button/Button";
import InputField from "../../../components/ui/InputField/InputField";
import { loginSchema } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "../../../components/ui/Logo";
import apiClient from "../../../services/apiClient";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    await apiClient.post("/api/auth/login", data);

    toast.success("Logged in successfully!");

    return navigate("/links");
  };

  return (
    <main className="login-content">
      <header className="login-header">
        <Logo />
      </header>

      <section aria-labelledby="login-heading" className="login-form-container">
        <h1 id="login-heading">Login</h1>
        <p className="login-description">
          Add your details below to get back into the app
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            id="email"
            label="Email address"
            type="email"
            name="email"
            placeholder="e.g. alex@email.com"
            autoComplete="email"
            isError={errors.email ? true : false}
            errorMsg={errors.email ? errors.email.message : ""}
            imgElement={<img src="images/icon-email.svg" alt="" />}
            register={register}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            isError={errors.password ? true : false}
            errorMsg={errors.password ? errors.password.message : ""}
            imgElement={<img src="images/icon-password.svg" alt="" />}
            register={register}
          />

          <Button
            text="Login"
            type="submit"
            disabled={isSubmitting}
            className="button button--primary"
          />
        </form>

        <p className="login-signup-text">
          Don't have an account?&nbsp;
          <Link to="/register" className="create-account-link">
            Create account
          </Link>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
