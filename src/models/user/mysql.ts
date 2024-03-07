import { Model } from "./model";
import DTO from "./dto";
import query from "../../db/mysql";
import { OkPacketParams } from "mysql2";

class Mysql implements Model {
    async signup(user: DTO): Promise<DTO> {
        const { githubID } = user;
        const result: OkPacketParams = await query(`
            INSERT INTO users
            (github_id)
            VALUES
            (?)
        `, [ githubID ]);

        const newUser = {
            ...user,
            id: result.insertId
        };

        return newUser
    }

    async get(githubID: string): Promise<DTO> {
        const user: DTO = (await query(`
        SELECT  id, github_id 
        FROM    users
        WHERE   github_id = ?
        `, [githubID]))[0];
        return user
    }
}

const mysql = new Mysql
export default mysql