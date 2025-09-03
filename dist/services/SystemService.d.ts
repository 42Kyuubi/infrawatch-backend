import { System } from '../interface/System';
declare class SystemService {
    private table;
    create(systemData: System): Promise<System>;
    getAll(): Promise<System[]>;
    getById(id: string): Promise<System | null>;
    delete(id: string): Promise<void>;
    updatePartial(id: string, updateData: Partial<System>): Promise<System>;
}
declare const _default: SystemService;
export default _default;
//# sourceMappingURL=SystemService.d.ts.map