import { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiClient from "../../../services/apiClient";

export const usePublicProfile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const data = await apiClient.get(`/api/public/profile/${id}`);

      if (!data) return;

      const { profile } = data;

      setProfile(profile);
    };

    getProfile();
  }, [id]);

  return { profile };
};
