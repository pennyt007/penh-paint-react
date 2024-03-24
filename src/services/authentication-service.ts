import { setJwt } from "./api-client";
import createHttpService from "./http-service";

const tokenKey = "token";

// the setJwt function is called immediately after it is imported. 
// it ensures that the JWT is set in the default headers as soon
// as the module is imported. This ensures that subsequent API
// requests made using the apiClient will include the JWT for
// authentication, if available.
setJwt(getJwt())

// creates an instance of the HttpService class with the
// "/userAuthentication" endpoint and exports it as the
// default export of the module.
export default createHttpService("/userAuthentication");

// responsible for retrieving the JWT from the local storage.
export function getJwt() {
  const token = localStorage.getItem(tokenKey);
  return token;
}
