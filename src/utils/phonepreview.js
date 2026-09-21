import { PLATFORMS } from "./constants";
import { formatLabel } from "./formatter";

export const normalizePlatform = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");

export const getPlatformConfig = (platformName) => {
  const normalizedName = normalizePlatform(platformName);
  const platforms = Object.entries(PLATFORMS);

  const [, platform] =
    platforms.find(([key, value]) => {
      const names = [key, value?.platform, value?.name, value?.id].map(
        normalizePlatform,
      );

      return names.includes(normalizedName);
    }) ?? [];

  return platform;
};

export const formatPreviewLinks = (links = []) =>
  links.map((link) => {
    const platform = getPlatformConfig(link.platform);

    return {
      ...link,
      platformLabel: formatLabel(link.platform),
      bgColor: platform?.bgColor,
      textColor: platform?.textColor,
      icon: platform?.icon,
    };
  });

export const getVisiblePreviewLinks = (links = [], maxItems = 5) =>
  formatPreviewLinks(links).slice(0, maxItems);
