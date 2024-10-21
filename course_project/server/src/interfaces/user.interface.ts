export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {
    isAdmin?: boolean;
}