import axios, { CanceledError } from "axios";
//import { apiUrl } from "../config.json";

//const apiUrl = import.meta.env.VITE_REACT_APP_penh_apiUrl;

// create instance of Axios client with base URL
// obtained from a configuration file
export const apiClientPython = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_paint_python_apiUrl,
});

// set header with JWT in apiClient default headers used
// for authentication when making API requests by setting
// the JWT in the default headers, all subsequent requests
// made with the apiClient will include this header.
export const setJwt = (jwt: string | null) => {
  apiClientPython.defaults.headers.common["x-userauthenticate-token"] = jwt;
};

// this line exports the CanceledError from the Axios module.
// the CanceledError is an Axios-specific error class that is
// thrown when a request is canceled. By exporting it, other
// modules can import and use this error class if needed.
export { CanceledError };
