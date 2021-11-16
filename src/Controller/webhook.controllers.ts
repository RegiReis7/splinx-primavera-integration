import {Request, Response} from "express"
import log from "../Log"


export const paymentListener = async (req: Request, res: Response){
    log.info(req.body)
}