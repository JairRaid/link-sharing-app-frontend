import { formatLabel } from "../../../../utils/formatter";
import "./PhoneMockup.css";
import { useUserProfile } from "../../hooks/useUserProfile";
import { formatPreviewLinks } from "../../../../utils/phonepreview";

const PhoneMockup = () => {
  const { links, profile } = useUserProfile();

  const newLinks = formatPreviewLinks(links);

  const visibleLinks = newLinks.slice(0, 5);

  const skeletonLinks = Array.from({
    length: Math.max(0, 5 - visibleLinks.length),
  });

  return (
    <section className="phone-mockup-section">
      <div className="phone-mockup-container">
        <img src="./images/prototype-phone.svg" alt="" />{" "}
        <div className="phone-mockup-content">
          <header className="phone-mockup-header">
            <div
              className={`user-avatar-container ${profile?.profilePicture ? "border-4 border-purple-600" : ""}`}
            >
              {profile?.profilePicture && (
                <img
                  src={profile.profilePicture}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="user-info-container">
              {profile?.firstName ? (
                <p className="user-name">{`${profile.firstName} ${profile?.lastName}`}</p>
              ) : (
                <div className="skeleton-name"></div>
              )}
              {profile?.email ? (
                <p className="user-email">{profile.email}</p>
              ) : (
                <div className="skeleton-email"></div>
              )}
            </div>
          </header>
          <ul className="link-list">
            {visibleLinks.length !== 0 &&
              visibleLinks.map((link, index) => (
                <li
                  key={link.order + index}
                  className={`link-item flex items-center gap-x-8 ${link.platform === "frontend_mentor" && "border border-grey-200"}`}
                  style={{
                    color: link.textColor,
                    backgroundColor: link.bgColor,
                  }}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-x-8 w-full"
                  >
                    <img
                      src={link.icon}
                      className={`${link.platform !== "frontend_mentor" && "white-filter"}`}
                      alt=""
                    />
                    {formatLabel(link.platform)}
                    <img
                      src={`${import.meta.env.BASE_URL}/images/icon-arrow-right.svg`}
                      alt=""
                      className={`ml-auto ${link.platform === "frontend_mentor" && "filter-[brightness(0)_saturate(100%)_invert(44%)_sepia(8%)_saturate(15%)_hue-rotate(342deg)_brightness(99%)_contrast(95%)]"}`}
                    />
                  </a>
                </li>
              ))}
            {skeletonLinks.map((_, index) => (
              <li key={`skelelton${index}`} className="skeleton-link-item"></li>
            ))}
          </ul>
        </div>
        {/* <div className="skeleton-container">
          <header className="phone-mockup-header">
            <div className="user-avatar-container"></div>
            <div className="user-info-container">
              <div className="skeleton-name"></div>
              <div className="skeleton-email"></div>
            </div>
          </header>
          <ul className="skeleton-link-list">
            <li className="skeleton-link-item"></li>
            <li className="skeleton-link-item"></li>
            <li className="skeleton-link-item"></li>
            <li className="skeleton-link-item"></li>
            <li className="skeleton-link-item"></li>
          </ul>
        </div> */}
      </div>
    </section>
  );
};

export default PhoneMockup;
