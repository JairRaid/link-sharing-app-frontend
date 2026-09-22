import { useEffect } from "react";
import toast from "react-hot-toast";

const OFFLINE_MESSAGE =
  "You are offline. Please check your internet connection.";

export const useNetworkStatus = () => {
  useEffect(() => {
    const showOfflineToast = () => toast.error(OFFLINE_MESSAGE);
    const showOnlineToast = () => toast.success("You are back online.");

    if (!navigator.onLine) {
      showOfflineToast();
    }

    window.addEventListener("offline", showOfflineToast);
    window.addEventListener("online", showOnlineToast);

    return () => {
      window.removeEventListener("offline", showOfflineToast);
      window.removeEventListener("online", showOnlineToast);
    };
  }, []);
};
