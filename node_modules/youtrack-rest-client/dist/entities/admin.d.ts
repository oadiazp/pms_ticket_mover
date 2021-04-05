import { BaseEndpoint } from "./base";
import { TimetrackingEndpoint } from "./admin/timetracking";
import { YoutrackClient } from "../youtrack";
export declare class AdminEndpoint extends BaseEndpoint {
    protected client: YoutrackClient;
    readonly timetracking: TimetrackingEndpoint;
    constructor(client: YoutrackClient);
}
