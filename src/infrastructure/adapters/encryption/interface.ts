interface IEncryption {
    crypt(value: string): Promise<string>;
    decrypt(value: string, hash: string): Promise<boolean>;
}

export { IEncryption }