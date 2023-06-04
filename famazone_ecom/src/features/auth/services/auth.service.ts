import axios from "axios";
import jwt_decode from "jwt-decode";
import { DisplayUser } from "../models/DisplayUser.interface";
import { NewUser } from "../models/NewUser";
import { LoginUser } from "../models/LoginUser.interface";
import { JWT } from "../models/Jwt";
import { DecodedJwt } from "../models/DecodedJwt.interface";

const baseURL = process.env.REACT_APP_BASE_API as string;
type DisplayUserType = DisplayUser | null;

/**
 * This function registers a new user.
 *
 * It sends a POST request to the '/auth/register' endpoint with the new user's
 * information as the payload. The server is expected to create a new user with
 * the provided information and return a `DisplayUserType` object representing
 * the newly created user.
 *
 * @param {NewUser} newUser - An object representing the new user's information.
 *
 * @returns {Promise<DisplayUserType>} A promise that resolves to an object
 * representing the newly created user.
 *
 */
async function register(newUser: NewUser): Promise<DisplayUserType> {
  const response = await axios.post(`${baseURL}/auth/register`, newUser);
  return response.data;
}

interface JwtAndUserType {
  jwt: JWT;
  user: DisplayUserType;
}
/**
 * This function logs in a user using their credentials, which should be encapsulated
 * in a `LoginUser` object.
 *
 * It sends a POST request to the '/auth/login' endpoint with the user credentials as
 * the payload. The server is expected to respond with a JSON object containing a JWT
 * The function then decodes the JWT to extract the user information, stores the JWT
 * and the user information in the local storage, and returns the JWT and the user
 * information.
 *
 * @param {LoginUser} user - An object representing a user's credentials (username
 * and password).
 *
 * @returns {Promise<{ jwt: JWT; user: DisplayUser | null }>} A promise that resolves
 * to an object containing the JWT and the user information extracted from the JWT.
 * If the server response does not contain a valid JWT, the promise resolves to an
 * object with `jwt` being the server response and `user` being `null`.
 *
 * @remarks
 * The data stored in the local storage will persist even after closing the browser,
 * providing a method to keep users logged in across multiple browsing sessions.
 *
 */
async function login(user: LoginUser): Promise<JwtAndUserType> {
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
}

/**
 * Remove user and jwt object from the browser'local storage (Sign Out)
 */
function logout(): void {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
}

/**
 * This function verifies the validity of a JWT (JSON Web Token).
 *
 * It sends a POST request to the '/auth/verify-jwt' endpoint with the JWT as the
 * payload. The server is expected to respond with a payload containing the expiration
 * timestamp of the JWT. The function then compares this expiration timestamp with the
 * current time to determine whether the JWT is still valid.
 *
 * @param {string} jwt - The JSON Web Token (JWT) to be verified
 *
 * @returns {Promise<boolean>} if the expiration of the JWT is greater than the current
 * timestamp at the time of verification
 *
 * @remarks
 * This function is part of a system designed to mitigate the risk of using outdated or
 * expired tokens for authentication or authorization purposes. An invalid token could
 * be due to it being tampered with, expired, or issued by an unauthorized entity.
 */
async function verifyJwt(jwt: string): Promise<boolean> {
  const response = await axios.post(`${baseURL}/auth/verify-jwt`, { jwt });
  if (response.data) {
    const jwtExpirationMs = response.data.exp * 1000;
    return jwtExpirationMs > Date.now();
  }
  return false; // User is not validated
}

const authService = {
  register,
  login,
  logout,
  verifyJwt,
};

export default authService;
