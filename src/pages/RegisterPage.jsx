import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../features/auth/model/schema";
import InputField from "../components/ui/Input/InputField";
import Button from "../components/ui/Button/Button";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = (data) => {
    if (isSubmitting) console.log(isSubmitting);
    console.log(data);
  };

  return (
    <main className="register-content">
      <header className="register-header">
        <a href="/" aria-label="devlinks Home">
          <img src="images/logo-devlinks.svg" alt="devlinks logo" />
        </a>
      </header>

      <section
        aria-labelledby="register-heading"
        className="register-form-container"
      >
        <h1 id="register-heading">Create account</h1>
        <p>Let's get you started sharing your links!</p>

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
            label="Create password"
            type="password"
            name="password"
            placeholder="At least 8 characters"
            autoComplete="current-password"
            isError={errors.password ? true : false}
            errorMsg={errors.password ? errors.password.message : ""}
            imgElement={<img src="images/icon-password.svg" alt="" />}
            register={register}
          />
          <InputField
            id="confirmPassword"
            label="Confirm password"
            type="password"
            name="confirmPassword"
            placeholder="At least 8 characters"
            isError={errors.confirmPassword ? true : false}
            errorMsg={
              errors.confirmPassword ? errors.confirmPassword.message : ""
            }
            imgElement={<img src="images/icon-password.svg" alt="" />}
            register={register}
          />

          <Button
            text="Create new account"
            type="submit"
            className="button button--primary"
          />
        </form>

        <p className="login-signup-text">
          Already have an account?&nbsp;
          <a href="/login" className="login-account-link">
            Login
          </a>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
