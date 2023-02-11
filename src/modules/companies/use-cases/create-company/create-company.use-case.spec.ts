import { CreateCompanyUseCase } from "./create-company.use-case.";

describe("Create company use case", () => {
    it("should be able to create a company", () => {

        const company = {
            name: "Amazon Brazil",
            document: "28113589000153",
            phone: "11970707070",
            email: "product@amazon.com.br"
        }

        const useCase = new CreateCompanyUseCase();

        const companyCreated = useCase.exec(company);

        expect(companyCreated).toHaveProperty("id");
        expect(companyCreated.active).toBe(true);
    })
})