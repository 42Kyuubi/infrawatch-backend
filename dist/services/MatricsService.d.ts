import { DataMetrics } from '../interface/Metric';
declare class MatricsService {
    private table;
    getAll(): Promise<DataMetrics[]>;
    create(systemData: DataMetrics): Promise<DataMetrics>;
    updatePartial(id: string, updateData: Partial<DataMetrics>): Promise<any>;
}
declare const _default: MatricsService;
export default _default;
//# sourceMappingURL=MatricsService.d.ts.map