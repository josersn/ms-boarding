import jwt from "jsonwebtoken";
import { ITokenization } from "../../interfaces";


class JsonWebTokenProvider implements ITokenization {

    private readonly secret: string;
    private readonly expiresIn: number;

    constructor(secret: string, expiresIn: number) {
        this.secret = secret;
        this.expiresIn = expiresIn;
    }

    async sign(value: any): Promise<string> {
        return jwt.sign({ ...value }, this.secret, {
            expiresIn: this.expiresIn
        })
    }


    async verify(value: any): Promise<any | boolean> {
        try {
            return jwt.verify(value, this.secret, (err, decode) => {
                if (err) throw new Error()
                return decode
            })

        } catch (error) {
            return false
        }
    }
}

export { JsonWebTokenProvider }