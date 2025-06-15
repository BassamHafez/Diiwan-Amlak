import axiosInstance from "../Components/Logic/LogicFun";

const baseServerUrl = import.meta.env.VITE_Base_API_URL;
const validFormMethods = ["post", "patch", "put"];

export const signFormsHandler = async ({ type, formData, method }) => {
  try {
    let response = null;
    if (method === "put") {
      response = await axiosInstance.put(
        `${baseServerUrl}auth/resetPassword`,
        formData
      );
    } else {
      response = await axiosInstance.post(
        `${baseServerUrl}auth/${type}`,
        formData
      );
    }
    return response;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else if (error.request) {
      throw error.request;
    }
    throw error.message;
  }
};

export const mainFormsHandlerTypeFormData = async ({
  type,
  formData,
  method,
  token,
  isLimited,
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  };
  const myUrl = `${baseServerUrl}${type}`;

  try {
    let response = null;
    if (validFormMethods.includes(method)) {
      response = await axiosInstance[method](myUrl, formData, {
        headers,
      });
    } else {
      if (!token) {
        console.error("Unauthorized");
        return null;
      }
      response = await axiosInstance.get(myUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: isLimited ? { limit: Infinity } : undefined,
      });
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const mainFormsHandlerTypeRaw = async ({
  type,
  formData,
  method,
  token,
  isLimited,
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const url = `${baseServerUrl}${type}`;
  try {
    let response = null;
    if (validFormMethods.includes(method)) {
      response = await axiosInstance[method](url, formData, {
        headers,
      });
    } else {
      response = await axiosInstance.get(url, {
        headers,
        params: isLimited ? { limit: Infinity } : undefined,
      });
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const mainDeleteFunHandler = async ({ id, token, type }) => {
  try {
    const response = await axiosInstance.delete(
      `${import.meta.env.VITE_Base_API_URL}${type}/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const mainEmptyBodyFun = async ({ token, type, method }) => {
  try {
    const response = await axiosInstance[method](
      `${baseServerUrl}${type}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getPublicData = async ({ type }) => {
  try {
    const response = await axiosInstance.get(`${baseServerUrl}${type}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
