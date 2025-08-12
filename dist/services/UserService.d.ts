import { User, UserDTO } from '../models/User';
declare class UserService {
    private table;
    create({ name, email, password, role }: User): Promise<UserDTO>;
    getAll(): Promise<UserDTO[]>;
    getById(id: string): Promise<UserDTO | null>;
    delete(id: string): Promise<void>;
    updatePartial(id: string, updateData: Partial<UserDTO>): Promise<UserDTO>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=UserService.d.ts.map