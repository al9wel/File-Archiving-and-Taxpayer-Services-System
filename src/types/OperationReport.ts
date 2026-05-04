
export interface OperationReport {
    id: number;
    user: {
        first_name: string;
        last_name: string;
        name: string;
        role: string;
    };
    action: string;
    model: {
        id: number;
        name: string;
    };
    details: string;
    datetime: string;
}
