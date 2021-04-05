"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const urls_1 = require("../config/urls");
class SearchEndpoint extends base_1.BaseEndpoint {
    saved() {
        return this.toPromise(this.client.get(urls_1.urls.SAVED_SEARCHES)).then(response => {
            return response;
        });
    }
}
exports.SearchEndpoint = SearchEndpoint;
