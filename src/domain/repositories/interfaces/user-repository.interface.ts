import { User } from "../../entities/user";

interface IUserRepository {
    create(data: UserDTO): Promise<User>;
    findBy(where: any): Promise<User | undefined>;
}

interface UserDTO {
    companyId: number;
    email: string;
    password: string;
}


export { IUserRepository, UserDTO };
