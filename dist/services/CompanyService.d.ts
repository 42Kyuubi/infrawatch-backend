import { Company } from '../interface/Company';
import { System } from '../interface/System';
declare class SystemService {
    private table;
    create(systemData: Company): Promise<System>;
    getAll(): Promise<Company[]>;
    getById(id: string): Promise<Company | null>;
    delete(id: string): Promise<void>;
    updatePartial(id: string, updateData: Partial<Company>): Promise<Company>;
}
declare const _default: SystemService;
export default _default;
//# sourceMappingURL=CompanyService.d.ts.map