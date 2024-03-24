import jwtDecode from "jwt-decode";

export interface User {
  user: {
    user_id: number;
    email: string;
    user_role: string;
    staff_id: number;
  };
}

const tokenKey = "token";

// get current user's info and decode
export const getCurrentUser = async () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    if (jwt) {
      const jwtDecoded: User = jwtDecode(jwt);
      return jwtDecoded;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
