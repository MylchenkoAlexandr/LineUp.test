import md5 from "md5";
import jwt from "jsonwebtoken";

export const parseDtoError = ( result: object ): string => {
    const error = Object.keys( result ).map( (key)=>{
        const value = result[ key ];
        return value.join("\n") ;
    }).join("\n") ;

    return error ;
}
export const createHash = ( data:string, secret:string="" ): string => {
    return md5(`${ secret }${ data }`);
}
export const createSessionJWTToken = (data:object, secret:string="", options:object={} ):string => {
    const token = jwt.sign(data, secret, options ) ;
    return token ;
}
