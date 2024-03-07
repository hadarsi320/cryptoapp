import DTO from "./dto";

export interface Model {
    signup(user: DTO): Promise<DTO>;
    get(githubID: string): Promise<DTO>;
}