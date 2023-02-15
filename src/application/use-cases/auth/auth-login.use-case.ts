import ApiError from "../../core/api-error";
import { IUserService } from "../../services/user.service";
import { IUseCase } from "../interfaces/use-case.interface";

interface IAuthRequest {
    email: string;
    password: string;
}

interface IAuthResponse {
    token: string;
}

type IAuthLoginUseCase = IUseCase<IAuthRequest, IAuthResponse>

class AuthLoginUserCase implements IAuthLoginUseCase {

    constructor(private userService: IUserService) { }

    async exec(payload: IAuthRequest): Promise<IAuthResponse> {
        const user = await this.userService.getUserByEmail(payload.email);

        if (!user) {
            throw new ApiError(404, 404, "User not found")
        }

        const comparePassword = await this.userService.comparePassword(payload.password, user.password);

        if (!comparePassword) {
            throw new ApiError(404, 404, "User not found")
        }

        const token = await this.userService.generateToken({ id: user.id, email: user.email, companyId: user.companyId });

        return {
            token
        }
    }
}

export { AuthLoginUserCase, IAuthLoginUseCase };