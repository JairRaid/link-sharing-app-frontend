import AvatarUpload from "../components/AvatarUpload/AvatarUpload";
import InputField from "../../../components/ui/InputField/InputField";
import { useForm } from "react-hook-form";
import Button from "../../../components/ui/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../model/schema";
import { useEffect, useState } from "react";
import apiClient from "../../../services/apiClient";
import { useProfileStore } from "../store/useProfileStore";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const setProfile = useProfileStore((state) => state.setProfile);
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("firstName", getValues("firstName"));
    formData.append("lastName", getValues("lastName"));

    if (imageFile) formData.append("profilePicture", imageFile);

    const newProfile = await apiClient.patch("/api/user/profile", formData);

    toast.success("Profile saved successfully!");

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
        <AvatarUpload
          name="profilePicture"
          register={register}
          setImageFile={setImageFile}
        />

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
            autoComplete="email"
          />
        </section>
      </section>

      <hr />

      <footer className="links-footer">
        <Button
          type="button"
          text="Save"
          onClick={handleSubmit(handleSave)}
          className="button button--primary button-save"
          disabled={isSubmitting}
        />
      </footer>
    </section>
  );
};

export default ProfilePage;
