import { FastifyReply } from "fastify";
import { Controller, POST } from "fastify-decorators";
import { UserService } from "../../application/services/user.service";
import { AuthLoginUserCase } from "../../application/use-cases/auth/auth-login.use-case";
import { Encryption } from "../adapters/encryption/implementations";
import { Tokenization } from "../adapters/tokenization/implementations";
import { UserRepository } from "../database/prisma/repositories/user.repository.prisma";

@Controller("auth")
export default class AuthController {
    @POST("/")
    async loginUserCompose(req, reply: FastifyReply) {
        try {
            const userRepository = new UserRepository();
            const encryption = new Encryption();
            const tokenization = new Tokenization(String(process.env.SECRET), Number(process.env.EXPIRES_IN));
            const userService = new UserService(userRepository, encryption, tokenization);
            const useCase = new AuthLoginUserCase(userService);

            const data = await useCase.exec(req.body);

            return reply.status(201).send({
                message: "Logged with success",
                data

            });

        } catch (error: any) {
            return reply.status(error.code || 500).send({
                error: true,
                message: error.message || "Internal server error"
            });
        }
    }
}