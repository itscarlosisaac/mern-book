'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');

var issues = [{
    id: 1, status: 'Open', owner: 'Ryan', created: new Date('2018-01-23'), effort: 7, completionDate: undefined, title: 'Error in the console when clicking Add.'
}, {
    id: 2, status: 'Assigned', owner: 'Ravan', created: new Date('2018-01-27'), effort: 13, completionDate: new Date('2018-02-15'), title: 'Missing bottom border on panel.'
}, {
    id: 3, status: 'In Progress', owner: 'Michael', created: new Date('2018-01-29'), effort: 5, completionDate: new Date('2018-02-01'), title: 'Build table.'
}];

var IssueFilter = function (_React$Component) {
    _inherits(IssueFilter, _React$Component);

    function IssueFilter() {
        _classCallCheck(this, IssueFilter);

        return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));
    }

    _createClass(IssueFilter, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'This is a placeholder for de filter'
            );
        }
    }]);

    return IssueFilter;
}(React.Component);

var IssueRow = function (_React$Component2) {
    _inherits(IssueRow, _React$Component2);

    function IssueRow() {
        _classCallCheck(this, IssueRow);

        return _possibleConstructorReturn(this, (IssueRow.__proto__ || Object.getPrototypeOf(IssueRow)).apply(this, arguments));
    }

    _createClass(IssueRow, [{
        key: 'render',
        value: function render() {
            var issue = this.props.issue;
            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    issue.id
                ),
                React.createElement(
                    'td',
                    null,
                    issue.status
                ),
                React.createElement(
                    'td',
                    null,
                    issue.owner
                ),
                React.createElement(
                    'td',
                    null,
                    issue.created.toDateString()
                ),
                React.createElement(
                    'td',
                    null,
                    issue.effort
                ),
                React.createElement(
                    'td',
                    null,
                    issue.completionDate ? issue.completionDate.toDateString() : ' -- no date -- '
                ),
                React.createElement(
                    'td',
                    null,
                    issue.title
                )
            );
        }
    }]);

    return IssueRow;
}(React.Component);

IssueRow.propTypes = {
    issue_id: React.PropTypes.number.isRequired,
    issue_title: React.PropTypes.string
};

IssueRow.defaultProps = {
    // issue_title: ' -- untitled -- '
};

var IssueTable = function (_React$Component3) {
    _inherits(IssueTable, _React$Component3);

    function IssueTable() {
        _classCallCheck(this, IssueTable);

        return _possibleConstructorReturn(this, (IssueTable.__proto__ || Object.getPrototypeOf(IssueTable)).apply(this, arguments));
    }

    _createClass(IssueTable, [{
        key: 'render',
        value: function render() {
            var borderedStyle = { border: "1px solid silver", padding: 6 };
            var issueRows = this.props.issues.map(function (issue) {
                return React.createElement(IssueRow, { issue_id: issue.id, key: issue.id, issue: issue });
            });
            return React.createElement(
                'table',
                null,
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            { style: borderedStyle },
                            'Id'
                        ),
                        React.createElement(
                            'th',
                            { style: borderedStyle },
                            'Status'
                        ),
                        React.createElement(
                            'th',
                            { style: borderedStyle },
                            'Owner'
                        ),
                        React.createElement(
                            'th',
                            { style: borderedStyle },
                            'Created'
                        ),
                        React.createElement(
                            'th',
                            { style: borderedStyle },
                            'Effort'
                        ),
                        React.createElement(
                            'th',
                            { style: borderedStyle },
                            'Completion'
                        ),
                        React.createElement(
                            'th',
                            { style: borderedStyle },
                            'Title'
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    issueRows
                )
            );
        }
    }]);

    return IssueTable;
}(React.Component);

var IssueAdd = function (_React$Component4) {
    _inherits(IssueAdd, _React$Component4);

    function IssueAdd() {
        _classCallCheck(this, IssueAdd);

        return _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).apply(this, arguments));
    }

    _createClass(IssueAdd, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                'This is the form to add the Issue'
            );
        }
    }]);

    return IssueAdd;
}(React.Component);

var IssueList = function (_React$Component5) {
    _inherits(IssueList, _React$Component5);

    function IssueList() {
        _classCallCheck(this, IssueList);

        return _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).apply(this, arguments));
    }

    _createClass(IssueList, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'Issue Tracker'
                ),
                React.createElement(IssueFilter, null),
                React.createElement('hr', null),
                React.createElement(IssueTable, { issues: issues }),
                React.createElement('hr', null),
                React.createElement(IssueAdd, null)
            );
        }
    }]);

    return IssueList;
}(React.Component);

var continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
var message = continents.map(function (c) {
    return 'Hello ' + c + '!';
}).join(' - ');
var component = React.createElement(
    'p',
    null,
    message
);
ReactDOM.render(React.createElement(IssueList, null), contentNode);