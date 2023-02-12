import { User } from "../../domain/entities/user";
import { IUserRepository, UserDTO } from "../../domain/repositories/interfaces/user-repository.interface";

interface IUserService {
    createUser(user: UserDTO): Promise<User>
}

class UserService implements IUserService {

    constructor(private userRepository: IUserRepository) { }

    async createUser(user: UserDTO): Promise<User> {

        return this.userRepository.create(user);
    }

}

export { UserService, IUserService }