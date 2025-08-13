import { Employee, EmployeeDTO } from '../models/Employee';
declare class EmployeeService {
    create({ name, email, password, position }: Employee): Promise<EmployeeDTO>;
    getAll(): Promise<EmployeeDTO[]>;
}
declare const _default: EmployeeService;
export default _default;
//# sourceMappingURL=EmployeeService.d.ts.map