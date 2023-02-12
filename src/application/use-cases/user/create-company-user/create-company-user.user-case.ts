import { UserDTO } from "../../../../domain/repositories/interfaces/user-repository.interface";
import { ICompanyService } from "../../../services/company.service";
import { IUserService } from "../../../services/user.service";
import { IUseCase } from "../../interfaces/use-case.interface";

interface IRequest {
    document: string;
    email: string;
    password: string;
}

type ICreateCompanyUser = IUseCase<IRequest, UserDTO>;

class CreateCompanyUser implements ICreateCompanyUser {

    constructor(private userService: IUserService, private companyService: ICompanyService) { }

    async exec({
        document,
        email,
        password
    }: IRequest): Promise<UserDTO> {

        const company = await this.companyService.getCompanyByDocument(document);

        if (!company) {
            throw new Error("Company not found");
        }

        const user = await this.userService.createUser({
            companyId: company!.id,
            email,
            password
        });

        return user;

    }
}

export { CreateCompanyUser, ICreateCompanyUser }