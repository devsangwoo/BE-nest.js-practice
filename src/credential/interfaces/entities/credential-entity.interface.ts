export interface ICredential {
  id: string;
  email: string;
  password: string;
  confirmed: boolean;
  blocked: boolean;
}
