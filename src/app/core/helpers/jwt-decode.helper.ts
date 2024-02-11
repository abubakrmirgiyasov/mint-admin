import {ACCESS_TOKEN} from "@core/helpers/constants/storage.constants";
import {jwtDecode} from "jwt-decode";
import {JwtUser} from "@core/models/jwt.user";

const getAccessToken = (): string => {
  const token: string | null = localStorage.getItem(ACCESS_TOKEN);

  if (token)
    return token;
  else
    // document.location.replace(`/auth/sign-in?returnUrl=${window.location.href}`);

  return  "";
}

const setAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN, token);
}

const removeAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN);
}

const unauthorizedResult = (): void => {
  // document.location.replace(`/auth/sign-in?returnUrl=${window.location.href}`);
}

const getJwtUser = (): JwtUser => {
  try {
    const token = getAccessToken();
    return jwtDecode<JwtUser>(token);
  } catch (e: any) {
    console.log("jwt-decode.helper.30", e);

    // document.location.replace(`/auth/sign-in?returnUrl=${window.location.href}`);
    return {
      id: "",
      avatar: "",
      email: "",
      exp: 0,
      fullName: "",
      iat: 0,
      phone: "",
      role: "",
    };
  }
}

export { getJwtUser, unauthorizedResult, getAccessToken, setAccessToken, removeAccessToken };
