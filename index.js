class TrelloPMS {
    constructor(core) 
    {
        this.core = core;
    }

    async moveTicket(ticketId, desiredStatus)
    {
        const key = this.core.getInput('trello_app_key');
        const token = this.core.getInput('trello_token');

        const response = await axios.put(
            `https://api.trello.com/1/cards/${ticketId}?key=${key}&token=${token}`, 
            JSON.stringify({
                idList: desiredStatus
            }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}

class YouTrackPMS {
    constructor(core) {
        this.core = core;
    }

    async moveTicket(ticketId, desiredStatus)
    {
        const Youtrack = require("youtrack-rest-client");

        const baseUrl = this.core.getInput('youtrack_base_url')
        const token = this.core.getInput('youtrack_token')

        const config = {
            baseUrl: baseUrl,
            token: `perm:${token}`
        };
        const youtrack = new Youtrack(config);
        const updatedIssue = await youtrack.issues.update({
            id: ticketId,
            state: desiredStatus
        });

        console.log(updatedIssue);
    }
}

class TicketFinder {
    static get(message)
    {
        return message.split(":")[0];
    }
}

class PMSFactory {
    static factory(core) 
    {
        if (core.getInput('pms') === "youtrack") {
            return new YouTrackPMS(core);
        }

        return new TrelloPMS(core);
    }
}

const core = require('@actions/core');
const github = require('@actions/github');
const { default: axios } = require('axios');

try {
    const pmsManager = PMSFactory.factory(core);
    const ticketId = TicketFinder.get(github.context.payload.head_commit.message);
    pmsManager.moveTicket(ticketId, core.getInput('desired_status'));
}
catch (error) {
    core.setFailed(error.message);
}

