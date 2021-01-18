export type Users = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: Roles[];
}

export type UsersResponse = {
    content: Users[];
    totalPages: number;
}


export type Roles = {
    id: number;
    authority: string;
}