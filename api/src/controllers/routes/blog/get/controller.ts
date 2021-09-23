import EndPointControllerBase from "../../../../base/EndPointControllerBase";
import HttpStatusCodes from "http-status-codes";
import {Request, Response} from "express";
import {first} from "lodash";
import {TResponseFailed, TResponseSuccess} from "../../../../types";
import {logger, parseDtoError} from "../../../../helpers";
import dto from "./dto";
import validate from "validate.js";
import BlogModel from "../../../../models/database/blog.model";
import { BlogRecordsLimit } from "../../../../constants";

export default class Controller extends EndPointControllerBase {
    public handler = async (req: Request, res: Response): Promise<void> => {
        try {
            console.clear();
            this.validate( req.params ) ;
            const data:object = await this.paginator(+req.params.page);
            const payload:TResponseSuccess = {
                status: true,
                payload: data
            } ;
            res.status(HttpStatusCodes.OK).json( payload );

        } catch ({message}) {
            const payload: TResponseFailed = {
                status: false,
                error: { message }
            }
            res.status(HttpStatusCodes.FORBIDDEN).json(payload);
        }
    }
    private validate = ( data: object ): boolean => {
        const error = validate( data, dto ) ;
        if( error ) throw new Error( parseDtoError( error ) ) ;
        return true ;
    }
    private paginator = async ( page: number):Promise<object> => {
        const limit:number = BlogRecordsLimit;
        const offset:number = ( page - 1 ) * limit ;

        const query = [] ;
        query.push({ $match: {} });
        query.push({ $sort: { dateCreated: -1 } });
        query.push({ $facet: {
            paginator: [
                { $count: "total" },
                { $addFields: { page } },
                { $addFields: { limit } },
                { $addFields: { offset } },
            ],
            data: [
                { $skip: offset },
                { $limit: limit }
            ]
        }});

        const [ records ] = await BlogModel.aggregate(query).allowDiskUse(true);
        const { paginator, data } = records ;

        return {
            paginator: first(paginator),
            data
        } ;
    }
}
