"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const timetracking_1 = require("./admin/timetracking");
class AdminEndpoint extends base_1.BaseEndpoint {
    constructor(client) {
        super(client);
        this.client = client;
        this.timetracking = new timetracking_1.TimetrackingEndpoint(this.client);
    }
}
exports.AdminEndpoint = AdminEndpoint;
