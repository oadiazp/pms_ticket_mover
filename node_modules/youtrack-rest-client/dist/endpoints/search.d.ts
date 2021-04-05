import { BaseEndpoint } from "./base";
import { Search } from "..";
export declare class SearchEndpoint extends BaseEndpoint {
    saved(): Promise<Search[]>;
}
