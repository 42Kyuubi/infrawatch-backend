import { User, UserDTO } from '../interface/User';
declare class UserService {
    private table;
    create({ username, email, password, role, company_id }: User): Promise<UserDTO>;
    getAll(): Promise<UserDTO[]>;
    getById(id: string): Promise<UserDTO | null>;
    delete(id: string): Promise<void>;
    updatePartial(id: string, updateData: Partial<User>): Promise<UserDTO>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=UserService.d.ts.map