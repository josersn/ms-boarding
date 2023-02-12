export default class ApiError extends Error {
    status: number
    code: number
    message: string

    constructor(status: number, code: number, message: string) {
        super(message)

        this.status = status
        this.code = code
    }
}