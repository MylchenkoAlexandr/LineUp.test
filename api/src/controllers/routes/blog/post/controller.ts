import EndPointControllerBase from "../../../../base/EndPointControllerBase";
import HttpStatusCodes from "http-status-codes";
import {Request, Response} from "express";
import {TResponseFailed, TResponseSuccess} from "../../../../types";

export default class Controller extends EndPointControllerBase {
    public handler = async (req: Request, res: Response): Promise<void> => {
        try {
            const payload:TResponseSuccess = {
                success: true,
                data: null
            } ;
            res.status(HttpStatusCodes.OK).json( payload );

        } catch ({message}) {
            const payload: TResponseFailed = {
                success: false,
                error: { message }
            }
            res.status(HttpStatusCodes.FORBIDDEN).json(payload);
        }
    }
}
