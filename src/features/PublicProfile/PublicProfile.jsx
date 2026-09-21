import { formatLabel } from "../../utils/formatter";
import { formatPreviewLinks } from "../../utils/phonepreview";
import { usePublicProfile } from "./hooks/usePublicProfile";

const PublicProfile = () => {
  const { profile } = usePublicProfile();

  if (!profile) return;

  const { links } = profile;

  const newLinks = formatPreviewLinks(links);

  return (
    <div className="preview-layout">
      <div className="absolute w-full min-h-[22.3125rem] bg-purple-600 rounded-bl-4xl rounded-br-4xl"></div>
      <main className="profile-card">
        <section
          className="profile-card__content"
          aria-labelledby="profile-name"
        >
          <header className="profile-card__identity">
            <div
              className={`profile-card__avatar-wrapper ${profile?.profilePicture && "border-4 border-purple-600"}`}
            >
              {profile?.profilePicture && (
                <img
                  className="profile-card__avatar"
                  src={profile.profilePicture}
                  alt="Ben Wright"
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
                    className={`${link.platform !== "frontend_mentor" && "filter-[brightness(0)_saturate(100%)_invert(100%)_sepia(82%)_saturate(0%)_hue-rotate(145deg)_brightness(106%)_contrast(103%)]"}`}
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

export default PublicProfile;
