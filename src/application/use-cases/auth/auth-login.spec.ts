import { CompanyRepository } from "../../../domain/repositories/in-memory/company.repository";
import { UserRepository } from "../../../domain/repositories/in-memory/user.repository";
import { ICompanyRepository } from "../../../domain/repositories/interfaces/company-repository.interface";
import { IUserRepository } from "../../../domain/repositories/interfaces/user-repository.interface";
import { Encryption } from "../../../infrastructure/adapters/encryption/implementations";
import { IEncryption } from "../../../infrastructure/adapters/encryption/interface";
import { Tokenization } from "../../../infrastructure/adapters/tokenization/implementations";
import { ITokenization } from "../../../infrastructure/adapters/tokenization/interfaces";
import ApiError from "../../core/api-error";
import { CompanyService, ICompanyService } from "../../services/company.service";
import { IUserService, UserService } from "../../services/user.service";
import { AuthLoginUserCase, IAuthLoginUseCase } from "./auth-login.use-case";

let useCase: IAuthLoginUseCase;
let userService: IUserService;
let userRepository: IUserRepository;
let encryption: IEncryption;
let tokenization: ITokenization;
let companyRepository: ICompanyRepository;
let companyService: ICompanyService;


describe("Auth Login Test's", () => {

    beforeEach(async () => {
        // aux
        const data = {
            name: "Amazon Brazil",
            document: "28113589000153",
            phone: "11970707070",
            email: "product@amazon.com.br"
        };
        companyRepository = new CompanyRepository();
        companyService = new CompanyService(companyRepository);
        const company = await companyService.createCompany(data);

        userRepository = new UserRepository();
        encryption = new Encryption();
        tokenization = new Tokenization("MOCK_SECRET", 3600);
        userService = new UserService(userRepository, encryption, tokenization);
        await userService.createUser({
            companyId: company.id,
            email: "user.mail@amazon.com.br",
            password: "mock_password"
        });


        // under test
        useCase = new AuthLoginUserCase(userService);
    })

    it("Should be able to have a secret", async () => {

        const token = await useCase.exec({
            email: "user.mail@amazon.com.br",
            password: "mock_password"
        });

        expect(token).toBeTruthy();

    });

    it("Should not able to login with non exists user", async () => {

        const data = {
            email: "mock_user",
            password: "mock_password"
        };

        await expect(useCase.exec(data)).rejects.toThrowError(new ApiError(404, 404, "User not found"));
    });

    it("Should not able to login with wrong password user", async () => {

        const data = {
            email: "user.mail@amazon.com.br",
            password: "WRONG_PASSWORD"
        };

        await expect(useCase.exec(data)).rejects.toThrowError(new ApiError(404, 404, "User not found"));
    });
})