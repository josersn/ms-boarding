import { FastifyReply } from "fastify";
import { Controller, POST } from "fastify-decorators";
import { CompanyService } from "../../application/services/company.service";
import { UserService } from "../../application/services/user.service";
import { CreateCompanyUser } from "../../application/use-cases/user/create-company-user/create-company-user.user-case";
import { Encryption } from "../adapters/encryption/implementations";
import { CompanyRepository } from "../database/prisma/repositories/company.repository.prisma";
import { UserRepository } from "../database/prisma/repositories/user.repository.prisma";

@Controller("user")
export default class UserController {

    @POST("/company")
    async createCompanyUser(req, reply: FastifyReply) {
        try {
            const repository = new UserRepository();
            const encryption = new Encryption();
            const service = new UserService(repository, encryption);
            const companyRepository = new CompanyRepository();
            const companyService = new CompanyService(companyRepository);
            const useCase = new CreateCompanyUser(service, companyService);

            const user = await useCase.exec(req.body);

            reply.status(201).send({
                message: "User created",
                data: user
            })



        } catch (error: any) {
            return reply.status(error.code || 500).send({
                error: true,
                message: error.message || "Internal server error"
            })
        }
    }

}