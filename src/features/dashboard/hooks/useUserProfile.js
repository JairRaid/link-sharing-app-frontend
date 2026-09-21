import { useEffect } from "react";
import apiClient from "../../../services/apiClient";
import { useLinksStore } from "../store/useLinksStore";
import { useProfileStore } from "../store/useProfileStore";

export const useUserProfile = () => {
  const links = useLinksStore((state) => state.links);
  const setLinks = useLinksStore((state) => state.setLinks);

  const profile = useProfileStore((state) => state.profile);
  const setProfile = useProfileStore((state) => state.setProfile);

  useEffect(() => {
    const fetchLinks = async () => {
      const data = await apiClient.get("/api/links");

      if (data?.links) {
        setLinks(data.links);
      }
    };

    const fetchProfile = async () => {
      const data = await apiClient.get("/api/user/profile");

      if (data?.user) {
        setProfile(data.user);
      }
    };

    fetchLinks();
    fetchProfile();
  }, [setLinks, setProfile]);

  return { links, profile };
};
