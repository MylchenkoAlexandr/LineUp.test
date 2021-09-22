import {IEndPointController} from "../interfaces";
import {Request, Response} from "express";
import {EndPointType} from "../constants";
import {TEndPointRequirements} from "../types";

export default class EndPointControllerBase implements IEndPointController {

    private _type: EndPointType;
    public get type(): EndPointType {
        return this._type;
    }

    private _path: string;
    public get path(): string {
        return this._path;
    }

    public create(args: TEndPointRequirements) {
        this._type = args.type;
        this._path = args.path;

        return this;
    }
    public handler = async (req: Request, res: Response): Promise<void> => {}
}
