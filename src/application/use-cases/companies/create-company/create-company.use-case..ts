import { CompanyDTO } from "../../../../domain/repositories/interfaces/company-repository.interface";
import { ICompanyService } from "../../../services/company.service"
import { IUseCase } from "../../interfaces/use-case.interface";

interface ICompanyRequest {
    name: string;
    document: string;
    phone: string;
    email: string;
}

type ICreateCompanyUseCase = IUseCase<ICompanyRequest, CompanyDTO>

class CreateCompanyUseCase implements ICreateCompanyUseCase {

    constructor(private companyService: ICompanyService) { }

    async exec(data: ICompanyRequest): Promise<CompanyDTO> {

        const companyAlreadyExists = await this.companyService.getCompanyByDocument(data.document);

        if (companyAlreadyExists) {
            throw new Error("Document already used");
        }


        return this.companyService.createCompany(data);
    }
}

export { CreateCompanyUseCase, ICompanyRequest, ICreateCompanyUseCase }