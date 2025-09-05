import { Integration } from '../interface/Integration';
declare class IntegrationService {
    private table;
    create(systemData: any): Promise<Integration>;
    findByToken(token: string): Promise<Integration | null>;
    getAll(): Promise<Integration[]>;
    getById(id: string): Promise<Integration | null>;
    delete(id: string): Promise<void>;
    updatePartial(id: string, updateData: Partial<Integration>): Promise<Integration>;
}
declare const _default: IntegrationService;
export default _default;
//# sourceMappingURL=IntegrationService.d.ts.map