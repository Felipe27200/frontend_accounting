import { JwtPayload } from "jwt-decode";

export interface CustomToken extends JwtPayload 
{
    scope?: string[] | string;
}
