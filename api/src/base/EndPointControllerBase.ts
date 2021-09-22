import {IEndPointController} from "../interfaces";
import {Request, Response} from "express";
import {RequestMethodTypes} from "../constants";
import {TEndPointHandler, TEndPointRequirements} from "../types";

export default class EndPointControllerBase implements IEndPointController {

    private _type: RequestMethodTypes;
    public get type(): RequestMethodTypes {
        return this._type;
    }

    private _path: string;
    public get path(): string {
        return this._path;
    }

    private _middlewares: TEndPointHandler[];
    public get middlewares(): TEndPointHandler[] {
        return this._middlewares;
    }

    public create(args: TEndPointRequirements) {
        this._type = args.type;
        this._path = args.path;
        this._middlewares = args.middlewares || [];

        return this;
    }
    public handler = async (req: Request, res: Response): Promise<void> => {}
}
