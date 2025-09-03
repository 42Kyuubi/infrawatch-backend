interface SignUpInput {
    username: string;
    email: string;
    password: string;
}
interface SignInInput {
    email: string;
    password: string;
}
declare class AuthService {
    signUp({ username, email, password }: SignUpInput): Promise<{
        userId: string | undefined;
    }>;
    signIn({ email, password }: SignInInput): Promise<{
        access_token: string;
        refresh_token: string;
        expires_in: number;
        user: {
            id: string;
            email: string | undefined;
        };
    }>;
    refresh(refresh_token: string): Promise<{
        access_token: string;
        refresh_token: string;
        expires_in: number;
        user: import("@supabase/auth-js").User;
    }>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=AuthService.d.ts.map