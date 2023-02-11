import { CompanyDTO, ICompanyRepository } from "../../domain/repositories/interfaces/company-repository.interface";

interface ICompanyService {
    createCompany(company: CompanyDTO): Promise<Company>
}

class CompanyService implements ICompanyService {

    constructor(private companyRepository: ICompanyRepository) { }

    async createCompany(company: CompanyDTO): Promise<Company> {
        return this.companyRepository.create(company);
    }
}

export {
    CompanyService,
    ICompanyService
}