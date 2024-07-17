// fix err types, bağımlılığı azalt kendi içinde rol alsın
export class ErrorHandler extends Error {
    statusCode: number;
    message: string;

    constructor(statusCode: number,message: string,) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }

    static handleError(err: ErrorHandler, res: any) {
        res.status(err.statusCode || 500).json({
            status: "error",
            statusCode: err.statusCode || 500,
            message: err.message || 'System Error'
        });
    }
}
