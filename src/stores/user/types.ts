export interface UserLogin {
  userName: String;
  password: String;
}

export interface User {
  id?: String;
  name?: String;
  email?: String;
  isAuthenticated: Boolean;
}
