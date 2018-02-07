db = new Mongo().getDB('issuetracker');

db.issues.remove({});

db.issues.insert(
    [
        {
            status: 'Open', owner: 'Ravan',
            created: new Date('2018-02-21'), effort: 5,
            completionDate: undefined,
            title: 'Error in the console on clicking'
        },
        {
            status: 'Open', owner: 'Michael',
            created: new Date('2018-02-23'), effort: 2,
            completionDate: undefined,
            title: 'No CSS on mobile'
        },
        {
            status: 'Open', owner: 'Roy',
            created: new Date('2018-02-12'), effort: 15,
            completionDate: undefined,
            title: 'Error with the video player'
        }
    ]
)

db.issues.createIndex({ status: 1 })
db.issues.createIndex({ owner: 1 })
db.issues.createIndex({ created: 1 })