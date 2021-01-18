export type Users = {
    id: number;
    firstName: string;
    lastName: string;
    description: string;
    email: string;
}

export type UsersResponse = {
    content: Users [];
    totalPages: number;
}