import { Company } from "../../entities/company";
import { CompanyDTO, ICompanyRepository } from "../interfaces/company-repository.interface";

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

    async findBy({ where }: any): Promise<Company | undefined> {
        const key = Object.keys(where)[0];
        const value = Object.values(where)[0];

        return this.companies.find(company => company[key] === value);
    }
}

export { CompanyRepository }