export interface JwtUser {
  id: string;
  avatar: string | null;
  email: string;
  phone: string;
  fullName: string;
  role: string;
  exp: number;
  iat: number;
}
