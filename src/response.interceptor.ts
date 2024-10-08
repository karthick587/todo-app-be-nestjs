import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        return next.handle().pipe(
            map(data => ({
                statusCode,
                message: statusCode >= 400 ? 'Error' : 'Success',
                data: data,
                error: statusCode >= 400 ? response.message : null
            })),
            catchError(err => {
                const statusCode = err instanceof HttpException ? err.getStatus() : 500;
                const errorResponse = {
                    statusCode,
                    message: err.message || 'Internal server error',
                    error: err.getResponse() || 'Error',
                };
                return throwError(() => new HttpException(errorResponse, statusCode));
            })

        );
    }
}