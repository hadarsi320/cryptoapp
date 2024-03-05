import { NextFunction, Request, Response } from "express";

export function dashboard(req: Request, res: Response, next: NextFunction) {
    res.send('Hello')    
}