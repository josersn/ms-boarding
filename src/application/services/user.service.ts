import { User } from "../../domain/entities/user";
import { IUserRepository, UserDTO } from "../../domain/repositories/interfaces/user-repository.interface";
import { IEncryption } from "../../infrastructure/adapters/encryption/interface";
import { ITokenization } from "../../infrastructure/adapters/tokenization/interfaces";

interface IUserService {
    createUser(user: UserDTO): Promise<User>
    getUserByEmail(email: string): Promise<User | undefined | null>
    comparePassword(password: string, hash): Promise<Boolean>
    generateToken(payload: any): Promise<string>
}

class UserService implements IUserService {

    constructor(
        private userRepository: IUserRepository,
        private encryptionAdapter: IEncryption,
        private tokenizationAdapter: ITokenization
    ) { }

    async createUser(user: UserDTO): Promise<User> {

        user.password = await this.encryptionAdapter.crypt(user.password);

        return this.userRepository.create(user);
    }

    async getUserByEmail(email: string): Promise<User | undefined | null> {
        return this.userRepository.findBy({
            where: {
                email
            }
        });
    }

    async comparePassword(password: string, hash: string): Promise<Boolean> {
        return this.encryptionAdapter.decrypt(password, hash);
    }

    async generateToken(payload: any): Promise<string> {
        return this.tokenizationAdapter.sign(payload)
    }

}

export { UserService, IUserService }