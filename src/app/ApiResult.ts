import { IForm } from "./form";

export interface IApiResult{
    success: boolean,
    message : string,
    data : IForm[]
}