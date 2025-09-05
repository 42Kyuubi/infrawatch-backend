import { Alerts } from '../interface/Alerts';
declare class AlertService {
    private table;
    create(AlertsData: Alerts): Promise<Alerts>;
    getAll(): Promise<Alerts[]>;
}
declare const _default: AlertService;
export default _default;
//# sourceMappingURL=AlertService.d.ts.map