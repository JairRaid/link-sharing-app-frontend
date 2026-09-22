import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getResponseData = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

export const apiClient = {
  async request(
    endpoint,
    { method = "GET", body, headers = {}, ...options } = {},
  ) {
    const isFormData = body instanceof FormData;

    const config = {
      method,
      credentials: "include",
      ...options,
      headers: {
        ...headers,
      },
    };

    if (body !== undefined) {
      config.body = isFormData ? body : JSON.stringify(body);

      if (!isFormData && !config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }
    }

    let response;

    try {
      response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    } catch (error) {
      // navigator is online but unable to reach server
      const message = navigator.onLine
        ? "Unable to reach the server. Please try again."
        : "You are offline. Please check your internet connection.";
      const networkError = new Error(message, { cause: error });

      networkError.status = 0;
      toast.error(networkError.message);
      throw networkError;
    }

    const data = await getResponseData(response);

    if (!response.ok) {
      const error = new Error(data?.message || "Request failed");
      error.status = response.status;
      error.data = data;
      toast.error(error.message);
      throw error;
    }

    return data;
  },

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "GET" });
  },

  post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: "POST", body });
  },

  put(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: "PUT", body });
  },

  patch(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: "PATCH", body });
  },

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  },
};

export default apiClient;
