import { Log } from "../interface/Log";
declare class LogService {
    private table;
    constructor({ system_id, user_id, event_type, description, company_id }: Log);
    create(logsData: Log): Promise<Log>;
    getAll(): Promise<Log[]>;
    getById(id: string): Promise<Log | null>;
    delete(id: string): Promise<void>;
}
export default LogService;
//# sourceMappingURL=LogService.d.ts.map