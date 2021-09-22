import { ServerOptions, DatabaseOptionsType } from "../types"

export const ApplicationOptions: ServerOptions = {
    port: 7777,
    host: "localhost"
}
export const DBOptions: DatabaseOptionsType = {
    url: "mongodb+srv://root:fj3_1hIg234uh234@lineup.vjsrr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
}


export const EndPointInitialPath:string = "api" ;
export enum EndPointType {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    OPTIONS = "options"
}
