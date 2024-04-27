export interface SessionState {
  isLoggedIn: boolean;
  userName: string;
  userAvatar: string;
}

export interface SessionContextType extends SessionState {
  login: (accessToken: string, userName: string, userAvatar: string) => void;
  logout: () => void;
}
