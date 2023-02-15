import { UserDTO } from "../../../../domain/repositories/interfaces/user-repository.interface";
import ApiError from "../../../core/api-error";
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
            throw new ApiError(404, 404, "Company not found")
        }

        const userFound = await this.userService.getUserByEmail(email);

        if(userFound) {
            throw new ApiError(403, 403, "E-mail already used")
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