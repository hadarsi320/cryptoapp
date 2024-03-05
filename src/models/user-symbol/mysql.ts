import { Model } from "./model";
import { DTO } from "./dto";
import query from "../../db/mysql";
import { OkPacketParams } from "mysql2";

class Mysql implements Model {
    async add(userSymbol: DTO): Promise<DTO> {
        const { userID, symbol } = userSymbol;
        const result: OkPacketParams = await query(`
            INSERT INTO users_symbols
            (user_id, symbol)
            VALUES
            (?, ?)
        `, [userID, symbol]);

        const newUserSymbol = {
            ...userSymbol,
            id: result.insertId
        };

        return newUserSymbol
    }

    async getForUser(userID: number): Promise<DTO[]> {
        const userSymbols: DTO[] = await query(`
        SELECT id, user_id, symbol 
        FROM users_symbols
        WHERE user_id = ?
        `, [userID]);
        return userSymbols
    }
}

const mysql = new Mysql
export default mysql