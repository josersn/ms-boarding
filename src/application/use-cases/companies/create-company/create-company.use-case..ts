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
        return this.companyService.createCompany(data);
    }
}

export { CreateCompanyUseCase, ICompanyRequest, IUseCase }