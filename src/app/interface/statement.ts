export interface Statement 
{
    id: number,
    name: string,
    initDate: Date | null | string,
    endDate: Date | null | string,
    user?: any
}