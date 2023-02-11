import { CompanyDTO } from "../../../../domain/repositories/interfaces/company-repository.interface";
import { ICompanyService } from "../../../services/company.service"

interface ICompanyRequest {
    name: string;
    document: string;
    phone: string;
    email: string;
}

interface IUseCase {
    exec(data: ICompanyRequest): Promise<any>
}

class CreateCompanyUseCase implements IUseCase {

    constructor(private companyService: ICompanyService) { }

    async exec(data: ICompanyRequest): Promise<CompanyDTO> {

        const companyAlreadyExists = await this.companyService.getCompanyByDocument(data.document);

        if (companyAlreadyExists) {
            throw new Error("Document already used");
        }


        return this.companyService.createCompany(data);
    }
}

export { CreateCompanyUseCase, ICompanyRequest, IUseCase }