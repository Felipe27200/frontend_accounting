export interface ErrorResponse
{
    status: number | string;
    message: string;
    severity?: string;
}