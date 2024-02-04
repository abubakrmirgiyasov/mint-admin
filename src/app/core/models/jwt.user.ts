export interface JwtUser {
  id: string;
  avatar: string | null;
  email: string;
  phone: string;
  fullName: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
  exp: number;
  iat: number;
}
