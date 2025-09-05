export interface User {
    id?: string;
    username: string;
    email: string;
    password: string;
    role: string;
    company_id: string | undefined;
}
export interface UserDTO {
    id: string;
    username: string;
    role: string;
    created_at: string;
    email: string;
    status: string;
    user: {
        id: string;
        email: string;
        display_name: string;
    };
}
//# sourceMappingURL=User.d.ts.map