import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, POST } from "fastify-decorators";
import { CompanyService } from "../../application/services/company.service";
import { CreateCompanyUseCase } from "../../application/use-cases/companies/create-company/create-company.use-case.";
import { CompanyRepository } from "../../domain/repositories/in-memory/company.repository";

@Controller("company")
export default class CompanyController {
    @POST("/")
    async createCompany(req, reply: FastifyReply) {
        try {
            const repository = new CompanyRepository();
            const service = new CompanyService(repository);
            const useCase = new CreateCompanyUseCase(service);

            const company = await useCase.exec(req.body);


            reply.status(201).send({
                message: "Company created",
                data: company
            })

        } catch (error) {
            return reply.status(500).send({
                error: true,
                message: "Internal serve error"
            })
        }
    }
}