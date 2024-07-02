export class ErrorHandler extends Error {
    statusCode: number;
    message: string;

    constructor(statusCode: number, message: string) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }

    static handleError(err: ErrorHandler, res: any) {
        const { statusCode, message } = err;
        res.status(statusCode || 500).json({
            status: "error",
            statusCode,
            message
        });
    }
}
