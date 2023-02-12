import { User } from "../../entities/user";

interface IUserRepository {
    create(data: UserDTO): Promise<User>;
}

interface UserDTO {
    companyId: number;
    email: string;
    password: string;
}


export { IUserRepository, UserDTO };
