import {
  AuthError,
  AuthResponse,
  AuthTokenResponsePassword,
  Session,
  User,
} from "@supabase/supabase-js";

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export interface AuthContextType extends AuthState {
  signIn: (
    email: string,
    password: string
  ) => Promise<AuthTokenResponsePassword>;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<{ error: AuthError | null }>;
}
