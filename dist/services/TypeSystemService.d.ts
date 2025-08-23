import { System } from '../interface/System';
declare class TypeSystemService {
    private table;
    create(systemTypeData: {
        name: string;
        company_id: string;
    }): Promise<System>;
    getAll(): Promise<any[]>;
    getById(id: string): Promise<any>;
    delete(id: string): Promise<void>;
    updatePartial(id: string, updateData: Partial<System>): Promise<any>;
}
declare const _default: TypeSystemService;
export default _default;
//# sourceMappingURL=TypeSystemService.d.ts.map