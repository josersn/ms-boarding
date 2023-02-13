import { JsonWebTokenProvider } from "./json-web-token/json-web-token"

class Tokenization extends JsonWebTokenProvider {
    constructor(secret: string, expiresIn: number) {
        super(secret, expiresIn)
    }
}

export { Tokenization }