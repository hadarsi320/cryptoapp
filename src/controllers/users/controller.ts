import { NextFunction, Request, Response } from "express";
import getModel from "../../models/user-symbol/factory"
import { DTO } from "../../models/user-symbol/dto";

export async function dashboard(req: Request, res: Response, next: NextFunction) {
    try {
        const userSymbols = await getModel().getForUser(1);
        res.render('users/dashboard', { userSymbols })
    } catch (error) {
        next(error)
    }   
}

export async function addSymbol(req: Request, res: Response, next: NextFunction) {
    try {
        const userSymbolModel = getModel();
        const inputUserSymbol: DTO = {
            ...req.body,
            userID: 1
        }
        const newUserSymbol = await userSymbolModel.add(inputUserSymbol);
        console.log(`new user symbol added with id ${newUserSymbol.id}`)
        res.redirect('/users/dashboard')
    } catch (err) {
        next(err)
    }
}