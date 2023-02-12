import { Company } from "../../../../domain/entities/company";
import { CompanyDTO, ICompanyRepository } from "../../../../domain/repositories/interfaces/company-repository.interface";
import { prismaClient } from "../index";

class CompanyRepository implements ICompanyRepository {

    create(company: CompanyDTO): Promise<Company> {
        return prismaClient.company.create({
            data: {
                ...company
            }
        });
    }

    async findBy(where: any): Promise<Company | undefined | null> {
        return prismaClient.company.findFirst(where);
    }
}

export { CompanyRepository }