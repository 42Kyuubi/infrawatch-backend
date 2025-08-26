interface IApiCheck {
    status: string;
    time: null | number;
    headers: {};
}
export declare function Apicheck(url: string): Promise<IApiCheck>;
export {};
//# sourceMappingURL=apicheck.d.ts.map