import { User } from "../../entities/user";
import { IUserRepository, UserDTO } from "../interfaces/user-repository.interface";

class UserRepository implements IUserRepository {

    private users: User[];

    constructor() {
        this.users = []
    }

    async create(data: UserDTO): Promise<User> {

        const user: User = {
            id: Math.floor(Math.random() * 100),
            ...data,
            active: true,
        };

        this.users.push(user);


        return user;
    }

    async findBy({ where }: any): Promise<User | undefined> {
        const key = Object.keys(where)[0];
        const value = Object.values(where)[0];

        let user = this.users.find(user => user[key] === value);

        return user;

    }

}

export { UserRepository }