import bcrypt from "bcrypt";

import { IEncryption } from "../../interface";

class BcryptProvider implements IEncryption {

    async crypt(value: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(value, salt);
    }

    decrypt(value: string, hash: string): Promise<boolean> {
        return bcrypt.compare(value, hash);
    }

}

export { BcryptProvider }