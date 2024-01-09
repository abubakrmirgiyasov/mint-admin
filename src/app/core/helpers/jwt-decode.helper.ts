import {ACCESS_TOKEN} from "@core/helpers/constants/storage.constants";
import {jwtDecode} from "jwt-decode";
import {JwtUser} from "@core/models/jwt.user";

const getAccessToken = (): string => {
  const token: string | null = localStorage.getItem(ACCESS_TOKEN);

  if (token)
    return token;
  else
    document.location.replace(`/auth/sign-in?returnUrl=${window.location.href}`);

  return  "";
}

const getJwtUser = (): JwtUser => {
  try {
    const token = getAccessToken();
    return jwtDecode<JwtUser>(token);
  } catch (e: any) {
    document.location.replace(`/auth/sign-in?returnUrl=${window.location.href}`);
    console.log(e)
    return {avatar: "", email: "", exp: 0, fullName: "", iat: 0, id: "", phone: "", role: ""};
  }
}

export { getJwtUser };
