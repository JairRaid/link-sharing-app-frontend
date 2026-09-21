import AvatarUpload from "../components/AvatarUpload/AvatarUpload";
import InputField from "../../../components/ui/InputField/InputField";
import { useForm } from "react-hook-form";
import Button from "../../../components/ui/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../model/schema";
import { useEffect } from "react";
import apiClient from "../../../services/apiClient";
import { useProfileStore } from "../store/useProfileStore";

const ProfilePage = () => {
  const setProfile = useProfileStore((state) => state.setProfile);

  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const handleSave = async () => {
    const isValidProfile = await trigger();

    if (!isValidProfile) return console.log(errors);

    const formData = new FormData();

    formData.append("firstName", getValues("firstName"));
    formData.append("lastName", getValues("lastName"));

    if (getValues("profilePicture")?.[0])
      formData.append("profilePicture", getValues("profilePicture")?.[0]);

    const newProfile = await apiClient.patch("/api/user/profile", formData);

    console.log(newProfile);

    setProfile(newProfile);

    reset({
      firstName: newProfile.firstName ?? "",
      lastName: newProfile.lastName ?? "",
      email: newProfile.email ?? "",
    });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await apiClient.get("/api/user/profile");
      if (!data) return;

      const { user } = data;

      setProfile(user);

      reset({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
      });
    };
    fetchProfile();
  }, [reset, setProfile]);

  return (
    <section className="profile-details" aria-labelledby="profile-title">
      <header className="profile-header">
        <h1 id="profile-title" className="profile-title">
          Profile Details
        </h1>
        <p className="profile-description">
          Add your details to create a personal touch to your profile.
        </p>
      </header>

      <section className="profile-section">
        <AvatarUpload name="profilePicture" register={register} />

        <section className="profile-fields">
          <InputField
            id="firstName"
            name="firstName"
            label="First name*"
            placeholder="e.g. John"
            isError={errors.firstName ? true : false}
            errorMsg={errors.firstName ? errors.firstName.message : ""}
            register={register}
          />
          <InputField
            id="lastName"
            name="lastName"
            label="Last name*"
            placeholder="e.g. Appleseed"
            isError={errors.lastName ? true : false}
            errorMsg={errors.lastName ? errors.lastName.message : ""}
            register={register}
          />
          <InputField
            id="email"
            name="email"
            label="Email"
            placeholder="e.g. email@example.com"
            isError={errors.email ? true : false}
            errorMsg={errors.email ? errors.email.message : ""}
            register={register}
            disabled
          />
        </section>
      </section>

      <hr />

      <footer className="links-footer">
        <Button
          type="button"
          text="Save"
          onClick={handleSave}
          className="button button--primary button-save"
        />
      </footer>
    </section>
  );
};

export default ProfilePage;
