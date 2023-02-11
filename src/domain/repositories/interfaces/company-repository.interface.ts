interface ICompanyRepository {
    create(company: CompanyDTO): Promise<Company>
    findBy(where: any): Promise<Company | undefined>
}

interface CompanyDTO {
    name: string;
    document: string;
    phone: string;
    email: string;
}

export {
    ICompanyRepository,
    CompanyDTO
}