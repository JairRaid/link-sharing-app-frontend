import { useEffect, useRef, useState } from "react";
import { formatLabel } from "../../../utils/formatter";
import { useUserProfile } from "../../dashboard/hooks/useUserProfile";
import "./PreviewPage.css";
import { formatPreviewLinks } from "../../../utils/phonepreview";
import { Link } from "react-router";

const PreviewPage = () => {
  const { links, profile } = useUserProfile();
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef(null);

  const newLinks = formatPreviewLinks(links);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleShareLink = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const clientBaseUrl = window.location.origin;
    // const githubUrl = "/link-sharing-app-frontend/#";

    await navigator.clipboard.writeText(
      `${clientBaseUrl}${import.meta.env.BASE_URL}#/public/profile/${profile.id}`,
    );

    setIsCopied(true);

    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
      timeoutRef.current = null;
    }, 1500);
  };

  return (
    <div className="preview-layout">
      <div className="absolute w-full min-h-[22.3125rem] bg-purple-600 rounded-bl-4xl rounded-br-4xl"></div>
      <main className="profile-card">
        <header className="profile-card__header">
          <nav
            className="profile-card__navigation"
            aria-label="Profile actions"
          >
            <Link
              to="/links"
              className="profile-card__button button--secondary"
            >
              Back to Editor
            </Link>

            <button
              type="button"
              onClick={handleShareLink}
              className="profile-card__button button--primary"
            >
              {!isCopied ? (
                "Share Link"
              ) : (
                <span className="flex justify-center items-center gap-x-8">
                  Copied{" "}
                  <img
                    src="./images/icon-link.svg"
                    alt=""
                    className="white-filter"
                  />{" "}
                </span>
              )}
            </button>
          </nav>
        </header>

        <section
          className="profile-card__content"
          aria-labelledby="profile-name"
        >
          <header className="profile-card__identity">
            <div
              className={`profile-card__avatar-wrapper ${profile?.profilePicture && "border-4 border-purple-600"}`}
            >
              {profile.profilePicture && (
                <img
                  className="profile-card__avatar"
                  src={profile.profilePicture}
                  alt=""
                />
              )}
            </div>

            {profile?.firstName ? (
              <h1 id="profile-name" className="profile-card__name">
                {`${profile.firstName} ${profile.lastName}`}
              </h1>
            ) : (
              <div className="bg-grey-100 rounded-full w-[160px] h-16 mt-24"></div>
            )}

            <p className="profile-card__email">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
          </header>

          <nav
            className="profile-card__links"
            aria-label="Ben Wright's social links"
          >
            {newLinks.length !== 0 &&
              newLinks.map((link, index) => (
                <a
                  key={link.order + index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`profile-card__link ${link.platform === "frontend_mentor" && "border border-grey-200"}`}
                  style={{
                    color: link.textColor,
                    backgroundColor: link.bgColor,
                  }}
                >
                  <img
                    src={link.icon}
                    className={`${link.platform !== "frontend_mentor" && "white-filter"}`}
                    alt=""
                  />
                  {formatLabel(link.platform)}
                  <img
                    src="/images/icon-arrow-right.svg"
                    alt=""
                    className={`ml-auto ${link.platform === "frontend_mentor" && "filter-[brightness(0)_saturate(100%)_invert(44%)_sepia(8%)_saturate(15%)_hue-rotate(342deg)_brightness(99%)_contrast(95%)]"}`}
                  />
                </a>
              ))}
          </nav>
        </section>
      </main>
    </div>
  );
};

export default PreviewPage;
