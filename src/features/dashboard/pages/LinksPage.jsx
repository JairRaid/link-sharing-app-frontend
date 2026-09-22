import { Controller, useFieldArray, useForm } from "react-hook-form";
import Button from "../../../components/ui/Button/Button";
import InputField from "../../../components/ui/InputField/InputField";
import Dropdown from "../../../components/ui/Dropdown/Dropdown";
import { useEffect } from "react";
import apiClient from "../../../services/apiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { linksSchema } from "../model/schema";
import { useLinksStore } from "../store/useLinksStore";
import toast from "react-hot-toast";

const LinksPage = () => {
  const setLinks = useLinksStore((state) => state.setLinks);

  const {
    register,
    getValues,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(linksSchema),
    defaultValues: { links: [] },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "links",
  });

  const handleSave = async () => {
    const linksToSend = getValues("links");

    const nextLinks = await apiClient.put("/api/links/", linksToSend);

    toast.success("Links saved successfully!");

    if (Array.isArray(nextLinks.links)) reset({ links: nextLinks.links });

    setLinks(nextLinks.links);
  };

  const handleRemove = (indexToRemove) => {
    // Reordering element
    const links = getValues("links")
      .filter((_, index) => index !== indexToRemove)
      .map((link, index) => ({
        ...link,
        order: index + 1,
      }));

    remove(indexToRemove);
    links.forEach((link, index) => update(index, link));
  };

  useEffect(() => {
    const fetchLinks = async () => {
      const { links: nextLinks } = await apiClient.get("/api/links/");

      setLinks(nextLinks);

      if (Array.isArray(nextLinks)) reset({ links: nextLinks }); // Initialize links form with fetched links
    };

    fetchLinks();
  }, [setLinks, reset]);

  return (
    <section className="links-editor" aria-labelledby="links-title">
      <header className="links-header">
        <h1 id="links-title" className="links-title">
          Customize your links
        </h1>
        <p className="links-description">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
      </header>

      <Button
        type="button"
        text="+ Add new link"
        className="button button--secondary"
        onClick={() =>
          append({ platform: "", url: "", order: fields.length + 1 })
        }
      />

      {/* Links list */}
      {fields.length !== 0 && (
        <div className="links-container">
          {fields.map((field, index) => (
            <article key={`Link.${index}`} className="link-card">
              <div className="link-card__header">
                <h2 className="link-card__title">
                  <img src="./images/icon-link-item.svg" alt="" /> Link #
                  {index + 1}
                </h2>
                <button
                  type="button"
                  className="button button-remove"
                  aria-label={`Remove link ${index + 1}`}
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>
              </div>
              <Controller
                name={`links.${index}.platform`}
                control={control}
                render={({ field: dropdownField }) => (
                  <Dropdown dropdownField={dropdownField} />
                )}
              />

              <InputField
                id={`link-${index}`}
                label="Link"
                name={`links.${index}.url`}
                placeholder={field.placeholder}
                defaultValue={field.url}
                register={register}
                isError={errors?.links?.[index]?.url ? true : false}
                errorMsg={errors?.links?.[index]?.url?.message}
                imgElement={
                  <img
                    src={`${import.meta.env.BASE_URL}images/icon-link.svg`}
                    alt=""
                  />
                }
              />
            </article>
          ))}
        </div>
      )}

      {/* Empty element */}
      {!fields.length && (
        <div className="links-empty-content" role="status">
          <div className="empty-illustration" aria-hidden="true">
            <img
              src="./images/illustration-empty.svg"
              alt=""
              className="empty-illustration__image"
            />
          </div>

          <h2 className="empty-title">Let's get you started</h2>

          <p className="empty-description">
            Use the “Add new link” button to get started. Once you have more
            than one link, you can reorder and edit them. We're here to help you
            share your profiles with everyone!
          </p>
        </div>
      )}

      <hr />

      <footer className="links-footer">
        <Button
          type="button"
          text="Save"
          className="button button--primary button-save"
          onClick={handleSubmit(handleSave)}
          disabled={isSubmitting}
        />
      </footer>
    </section>
  );
};

export default LinksPage;
