import { ICompanyRepository } from "../../../../domain/repositories/interfaces/company-repository.interface";
import { CompanyRepository } from "../../../../domain/repositories/in-memory/company.repository";
import { CompanyService, ICompanyService } from "../../../services/company.service";
import { CreateCompanyUseCase, ICreateCompanyUseCase } from "./create-company.use-case.";
import ApiError from "../../../core/api-error";

let useCase: ICreateCompanyUseCase;
let service: ICompanyService;
let repository: ICompanyRepository;


describe("Create company use case", () => {

    const company = {
        name: "Amazon Brazil",
        document: "28113589000153",
        phone: "11970707070",
        email: "product@amazon.com.br"
    };

    beforeEach(() => {
        repository = new CompanyRepository();
        service = new CompanyService(repository);
        useCase = new CreateCompanyUseCase(service);
    })

    it("should be able to create a company", async () => {

        const companyCreated = await useCase.exec(company);

        expect(companyCreated).toHaveProperty("id");
        expect(companyCreated).toHaveProperty("active");
    });


    it("Should not be able to create a company with same document", async () => {

        await useCase.exec(company);


        await expect(useCase.exec(company)).rejects.toThrowError(new ApiError(403, 403, "Company already created"));
    });
})