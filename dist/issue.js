'use strict';

// Validating Fields
var validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true
};

var issueFieldType = {
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required'
};

function validateIssue(issue) {
    for (var field in issueFieldType) {
        var type = issueFieldType[field];
        if (!type) {
            delete issue[field];
        } else if (type === 'required' && !issue[field]) {
            return field + ' is required.';
        }
    }
    if (!validIssueStatus[issue.status]) {
        return issue.status + ' is not a valid status.';
    }

    return null;
}

module.exports = {
    validateIssue: validateIssue
};
//# sourceMappingURL=issue.js.map