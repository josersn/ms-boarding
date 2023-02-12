import { User } from "../../domain/entities/user";
import { IUserRepository, UserDTO } from "../../domain/repositories/interfaces/user-repository.interface";
import { IEncryption } from "../../infrastructure/adapters/encryption/interface";

interface IUserService {
    createUser(user: UserDTO): Promise<User>
    getUserByEmail(email: string): Promise<User | undefined | null>
}

class UserService implements IUserService {

    constructor(private userRepository: IUserRepository, private encryptionAdapter: IEncryption) { }

    async createUser(user: UserDTO): Promise<User> {

        user.password = await this.encryptionAdapter.crypt(user.password!);

        return this.userRepository.create(user);
    }

    async getUserByEmail(email: string): Promise<User | undefined | null> {
        return this.userRepository.findBy({
            where: {
                email
            }
        });
    }

}

export { UserService, IUserService }