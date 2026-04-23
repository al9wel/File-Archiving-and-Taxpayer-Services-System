
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth?: string | { date: string } | null;
    idCard?: string; // URL or path to the ID card file
    userName?: string;
    phone?: string;
    image?: string; // URL or path to the profile image
    role: string;
    mustChangePassword?: boolean;
    departmentID?: number | string; // Foreign key to the department
    departmentName?: string; // Display name of the department (read-only from backend)
}


//Parameters for updating a user.
export type UpdateUserParams = {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string | null;
    idCard?: string;
    userName?: string;
    phone?: string;
    image?: string;
    role?: string;
    departmentID?: number | string;
}
