import axios from "axios";
import jwt_decode from "jwt-decode";
import { DisplayUser } from "../models/DisplayUser.interface";
import { NewUser } from "../models/NewUser";
import { LoginUser } from "../models/LoginUser.interface";
import { JWT } from "../models/Jwt";
import { DecodedJwt } from "../models/DecodedJwt.interface";

const baseURL = process.env.REACT_APP_BASE_API as string;

const register = async (newUser: NewUser): Promise<DisplayUser | null> => {
  const response = await axios.post(`${baseURL}/auth/register`, newUser);
  return response.data;
};

// In authentication, when the user successfully logs in using their
// credentials, a JSON Web Token will be returned.
const login = async (
  user: LoginUser
): Promise<{ jwt: JWT; user: DisplayUser | null }> => {
  const response = await axios.post(`${baseURL}/auth/login`, user);
  // response' data must include JSON object: { "token": "jwt token" }
  if (response.data) {
    // store data with no expiration date in web browsers the data stored
    // in the browsers will persist even after you close the browser
    localStorage.setItem("jwt", JSON.stringify(response.data));
    // to decode JWT, extract the payload, that include user info object
    const decodedJwt: DecodedJwt = jwt_decode(response.data.token);
    localStorage.setItem("user", JSON.stringify(decodedJwt.user));
    return { jwt: response.data, user: decodedJwt.user };
  }
  return { jwt: response.data, user: null };
};

const logout = (): void => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
};

const verifyJwt = async (jwt: string): Promise<boolean> => {
  const response = await axios.post(`${baseURL}/auth/verify-jwt`, { jwt });
  if (response.data) {
    // In order to verify JWT, the expiration of JWT must be greater then
    // the current timestamp at the time of verification.  to mitigate the
    // risk of using outdated or expired tokens for authentication or
    //authorization purposes
    const jwtExpirationMs = response.data.exp * 1000;
    return jwtExpirationMs > Date.now();
  }
  return false; // User is not validated
};

const authService = {
  register,
  login,
  logout,
  verifyJwt,
};

export default authService;
