import { useEffect, useRef, useState } from "react";
import "./AvatarUpload.css";
import { validateFile } from "../../../../utils/validation";
import { useProfileStore } from "../../store/useProfileStore";

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

const maxSizeBytes = 5 * 1024 * 1024;

const AvatarUpload = ({ register, name, setImageFile }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);
  const {
    ref: formRef,
    onChange: formOnChange,
    ...inputProps
  } = register(name);

  const profile = useProfileStore((state) => state.profile);
  // const setProfile = useProfileStore((state) => state.setProfile);

  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];

    formOnChange(e);

    if (!selectedFile) return;

    const validation = validateFile(selectedFile, allowedTypes, maxSizeBytes);

    if (!validation.isValidFile) return;

    const { file } = validation;

    setImageFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  // Drag & drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];

    formOnChange(e);

    if (!droppedFile) return;

    const validation = validateFile(droppedFile, allowedTypes, maxSizeBytes);

    if (!validation.isValidFile) return;

    const { file } = validation;

    setImageFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    const initializeSlectedImage = () => {
      if (profile?.profilePicture)
        setSelectedImage(profile?.profilePicture ?? null);
    };

    initializeSlectedImage();
  }, [profile?.profilePicture]);

  return (
    <section className="avatar-upload">
      <label className="upload__label" htmlFor="profile-picture">
        Profile picture
      </label>

      <div className="upload__content">
        <div
          className={`upload__area ${isDragging ? "border-purple-600" : "border-transparent"}`}
          onClick={handleInputClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            id="profile-picture"
            type="file"
            accept={allowedTypes.join(",")}
            className="upload__file-input sr-only"
            onChange={handleFileSelect}
            {...inputProps}
            ref={(element) => {
              formRef(element);
              inputRef.current = element;
            }}
          />
          {!selectedImage && (
            <div className="upload__empty-state">
              <img src="./images/icon-upload-image.svg" alt="" />
              <span>+ Upload Image</span>
            </div>
          )}
          {selectedImage && (
            <img src={selectedImage} alt="" className="upload__preview-image" />
          )}
          {selectedImage && (
            <div className="upload__change-label">
              <img
                src="./images/icon-upload-image.svg"
                alt=""
                className="filter-[brightness(0)_saturate(100%)_invert(100%)_sepia(0%)_saturate(7500%)_hue-rotate(360deg)_brightness(107%)_contrast(112%)]"
              />
              <span className="font-semibold text-white">Change Image</span>
            </div>
          )}
        </div>

        <p className="upload__hint">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </div>
    </section>
  );
};

export default AvatarUpload;
