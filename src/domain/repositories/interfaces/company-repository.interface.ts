interface ICompanyRepository {
    create(company: CompanyDTO): Promise<Company>
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