const API_BASE_URL = "https://link-sharing-app-backend.vercel.app";

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

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await getResponseData(response);

    if (!response.ok) {
      const error = new Error(data?.message || "Request failed");
      error.status = response.status;
      error.data = data;
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
