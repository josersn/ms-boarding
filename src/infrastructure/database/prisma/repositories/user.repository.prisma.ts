import { prismaClient } from "..";
import { User } from "../../../../domain/entities/user";
import { IUserRepository, UserDTO } from "../../../../domain/repositories/interfaces/user-repository.interface";

class UserRepository implements IUserRepository {

    async create(user: UserDTO): Promise<User> {
        return prismaClient.user.create({
            data: {
                ...user
            }
        })
    }

    async findBy(where: any): Promise<User | undefined | null> {
        return prismaClient.user.findFirst(where)
    }

}

export { UserRepository }