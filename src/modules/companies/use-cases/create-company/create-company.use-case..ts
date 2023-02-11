class CreateCompanyUseCase {
    exec(data: any) {
        return {
            id: 1,
            ...data,
            active: true
        }
    }
}

export { CreateCompanyUseCase }