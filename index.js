class TrelloPMS {
    constructor(core) 
    {
        this.core = core;
    }

    moveTicket(ticketId, desiredStatus)
    {
        axios.put(`https://api.trello.com/1/cards/${ticketId}`, {
            params: {
                key: this.core.getInput('trello_app_key'),
                token: this.core.getInput('trello_token')
            },
            data: {
                idList: this.core.getInput(desiredStatus)
            }
        });
    }
}

class TicketFinder {
    get(message)
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

    console.log(github);

    const ticketId = TicketFinder.get(github.event.commits[0].message);
    psmManager.moveTicket(ticketId, core.getInput('desired_status'));
}
catch (error) {
    core.setFailed(error.message);
}

