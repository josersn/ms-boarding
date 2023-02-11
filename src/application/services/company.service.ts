import { Company } from "../../domain/entities/company";
import { CompanyDTO, ICompanyRepository } from "../../domain/repositories/interfaces/company-repository.interface";

interface ICompanyService {
    createCompany(company: CompanyDTO): Promise<Company>
    getCompanyByDocument(document: string): Promise<Company | undefined>
}

class CompanyService implements ICompanyService {

    constructor(private companyRepository: ICompanyRepository) { }

    async createCompany(company: CompanyDTO): Promise<Company> {
        return this.companyRepository.create(company);
    }

    async getCompanyByDocument(document: string): Promise<Company | undefined> {
        return this.companyRepository.findBy({
            where: {
                document
            }
        });
    }
}

export {
    CompanyService,
    ICompanyService
}