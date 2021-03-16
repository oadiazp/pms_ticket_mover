class TrelloPMS {
    constructor(core) 
    {
        this.core = core;
    }

    moveTicket(ticketId, desiredStatus)
    {
        console.log('Trello credentials');
        console.log({
            key: this.core.getInput('trello_app_key'),
            token: this.core.getInput('trello_token')
        })

        const key = this.core.getInput('trello_app_key');
        const token = this.core.getInput('trello_token');

        axios.put(`https://api.trello.com/1/cards/${ticketId}?key=${key}&token=${token}`, {
            data: {
                idList: desiredStatus
            }
        });
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
        if (core.getInput('pms') === "jira") {
            return new JiraPMS(core);
        }

        return new TrelloPMS(core);
    }
}

const core = require('@actions/core');
const github = require('@actions/github');
const { default: axios } = require('axios');

try {
    const psmManager = PMSFactory.factory(core);
    const ticketId = TicketFinder.get(github.context.payload.head_commit.message);
    psmManager.moveTicket(ticketId, core.getInput('desired_status'));
}
catch (error) {
    core.setFailed(error.message);
}

