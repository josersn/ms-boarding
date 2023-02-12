import { User } from "../../domain/entities/user";
import { IUserRepository, UserDTO } from "../../domain/repositories/interfaces/user-repository.interface";

interface IUserService {
    createUser(user: UserDTO): Promise<User>
    getUserByEmail(email: string): Promise<User | undefined>
}

class UserService implements IUserService {

    constructor(private userRepository: IUserRepository) { }

    async createUser(user: UserDTO): Promise<User> {

        return this.userRepository.create(user);
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findBy({
            where: {
                email
            }
        });
    }

}

export { UserService, IUserService }