import { CompanyDTO, ICompanyRepository } from "./company-repository.interface";

class CompanyRepository implements ICompanyRepository {

    private companies: Company[];

    constructor() {
        this.companies = [];
    }

    async create(data: CompanyDTO): Promise<Company> {
        const company = {
            id: 1,
            ...data,
            active: true
        }

        this.companies.push(company);

        return company;
    }
}

export { CompanyRepository }