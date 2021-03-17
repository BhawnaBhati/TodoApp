import axios from "axios";
import _ from "lodash";

axios.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    if (user) {
      const { token } = JSON.parse(user);
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getMessageFromAxiosError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
    return _.get(error.response, "data.message", error.response.statusText);
  }

  if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // console.log(error.request);
    return "Request Failed.";
  }
  // Something happened in setting up the request that triggered an Error
  // console.log("Error", error.message);
  return error.message;
};
