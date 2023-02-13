interface ITokenization {
    sign(value: any): Promise<string>
    verify(value: any): Promise<any | boolean>
}

export { ITokenization }