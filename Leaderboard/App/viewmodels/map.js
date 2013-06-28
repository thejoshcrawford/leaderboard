define(['services/datacontext', 'durandal/plugins/router', 'durandal/app'], function (datacontext, router, app) {
    var competitions = ko.observableArray();

    function activate() {
        return datacontext.getCompetitions(competitions);
    }

    var deactivate = function () {
        competitions([]);
    };

    function refresh() {
        return datacontext.getCompetitions(competitions);
    }

    var gotoDetails = function (selectedCompetition) {
        if (selectedCompetition && selectedCompetition.competitionId()) {
            var url = '#/competitiondetail/' + selectedCompetition.competitionId();
            router.navigateTo(url);
        }
    };

    var viewAttached = function (view) {
        bindEventToList(view, '.competition-brief', gotoDetails);
    };

    var bindEventToList = function (rootSelector, selector, callback, eventName) {
        var eName = eventName || 'click';
        $(rootSelector).on(eName, selector, function () {
            var competition = ko.dataFor(this);
            callback(competition);
            return false;
        });
    };

    var vm = {
        activate: activate,
        competitions: competitions,
        deactivate: deactivate,
        refresh: refresh,
        title: 'Competitions',
        viewAttached: viewAttached
    };

    return vm;
});