import { CompanyRepository } from "../../../../domain/repositories/in-memory/company.repository";
import { UserRepository } from "../../../../domain/repositories/in-memory/user.repository";
import { ICompanyRepository } from "../../../../domain/repositories/interfaces/company-repository.interface";
import { IUserRepository } from "../../../../domain/repositories/interfaces/user-repository.interface";
import { CompanyService, ICompanyService } from "../../../services/company.service";
import { IUserService, UserService } from "../../../services/user.service";
import { CreateCompanyUser, ICreateCompanyUser } from "./create-company-user.user-case";

let useCase: ICreateCompanyUser;
let service: IUserService;
let repository: IUserRepository;
let companyRepository: ICompanyRepository;
let companyService: ICompanyService;

describe("Create a Company User test", () => {

    beforeEach(async () => {

        // aux
        const company = {
            name: "Amazon Brazil",
            document: "28113589000153",
            phone: "11970707070",
            email: "product@amazon.com.br"
        };
        companyRepository = new CompanyRepository();
        companyService = new CompanyService(companyRepository);
        await companyService.createCompany(company);

        // under test
        repository = new UserRepository();
        service = new UserService(repository);
        useCase = new CreateCompanyUser(service, companyService);
    });

    it("Should be able to create a user", async () => {
        const data = {
            document: "28113589000153",
            email: "logistics@amazon.com",
            password: "amazon.logistics"
        }

        const user = await useCase.exec(data);

        expect(user).toBeTruthy();
        expect(user).toHaveProperty("id")

    })
})