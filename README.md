# PMS ticket mover

This GH action is for an automatic change in the ticket statuses inside of the most used project management systems (PMS): Jira, Trello and YouTrack.

## Usage
The commit messages shoud have the following structure:
<TicketShortID>: <Commit description>
And the Ticket short ID can be found, for example at:
https://trello.com/c/<TicketShortId>/<Title slug>
In the workflow definition:
``` yaml
steps:
    - name: move_ticket
      uses: github.com/oadiazp/pms_ticket_mover@master
      with:
        pms: trello # The PMS that you want to use
        desired_status: 5fb1913148595a037c1817ad # Destination Trello list ID you can get it from Trello API
        trello_token: "${{ secrets.TRELLO_TOKEN }}" # Trello token: https://trello.com/app-key
        trello_app_key: "${{ secrets.TRELLO_APP_KEY }}" # Trello App Key: https://trello.com/app-key
```
To use it with YouTrack
``` yaml
steps:
    - name: move_ticket
      uses: github.com/oadiazp/pms_ticket_mover@master
      with:
        pms: youtrack # The PMS that you want to use
        desired_status: Done 
        youtrack_token: "${{ secrets.YOUTRACK_TOKEN }}" # Trello token: https://trello.com/app-key
        youtrack_base_url: https://<youtrack URL>/youtrack
```
