interface IUseCase<RequestData, ResponseData> {
    exec(payload?: RequestData): Promise<ResponseData>
}

export { IUseCase }