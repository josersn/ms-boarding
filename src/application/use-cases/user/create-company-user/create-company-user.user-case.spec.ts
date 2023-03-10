import { CompanyRepository } from "../../../../domain/repositories/in-memory/company.repository";
import { UserRepository } from "../../../../domain/repositories/in-memory/user.repository";
import { ICompanyRepository } from "../../../../domain/repositories/interfaces/company-repository.interface";
import { IUserRepository } from "../../../../domain/repositories/interfaces/user-repository.interface";
import { Encryption } from "../../../../infrastructure/adapters/encryption/implementations";
import { IEncryption } from "../../../../infrastructure/adapters/encryption/interface";
import { Tokenization } from "../../../../infrastructure/adapters/tokenization/implementations";
import { ITokenization } from "../../../../infrastructure/adapters/tokenization/interfaces";
import ApiError from "../../../core/api-error";
import { CompanyService, ICompanyService } from "../../../services/company.service";
import { IUserService, UserService } from "../../../services/user.service";
import { CreateCompanyUser, ICreateCompanyUser } from "./create-company-user.user-case";

let useCase: ICreateCompanyUser;
let service: IUserService;
let repository: IUserRepository;
let encryption: IEncryption;
let companyRepository: ICompanyRepository;
let companyService: ICompanyService;
let tokenization: ITokenization;

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
        encryption = new Encryption();
        tokenization = new Tokenization(String(process.env.SECRET), Number(process.env.EXPIRES_IN));
        service = new UserService(repository, encryption, tokenization);
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

    });

    it("Should not be able to create a user with not exists company", async () => {
        const data = {
            document: "MOCK_DOCUMENT",
            email: "logistics@amazon.com",
            password: "amazon.logistics"
        }

        await expect(useCase.exec(data)).rejects.toThrowError(new ApiError(404, 404, "Company not found"));
    });

    it("Should not be able to create a user with e-mail is already register", async () => {
        const data = {
            document: "28113589000153",
            email: "logistics@amazon.com",
            password: "amazon.logistics"
        }

        await useCase.exec(data);

        await expect(useCase.exec(data)).rejects.toThrowError(new ApiError(403, 403, "E-mail already used"));
    });

    it("Should return a different password od was send", async () => {
        const data = {
            document: "28113589000153",
            email: "logistics@amazon.com",
            password: "amazon.logistics"
        }

        const user = await useCase.exec(data);

        const isEqual = user.password === data.password;

        expect(isEqual).toBeFalsy();

    })
})