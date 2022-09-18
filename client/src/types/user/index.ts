export type UserType = {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    token: string;
};

export type UserListType = {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
};
