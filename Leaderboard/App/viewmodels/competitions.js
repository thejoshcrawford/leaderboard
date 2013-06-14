define(['services/datacontext', 'durandal/plugins/router'], function (datacontext, router) {
    var competitions = ko.observableArray();
    var initialized = false;

    function activate() {
        if (initialized) {
            return;
        }
        initialized = true;
        return refresh();
    }
    
    var viewAttached = function (view) {
        bindEventToList(view, '.competition-brief', gotoDetails);
    };

    var gotoDetails = function (selectedCompetition) {
        if (selectedCompetition && selectedCompetition.competitionId()) {
            var url = '#/competitiondetail/' + selectedCompetition.competitionId();
            router.navigateTo(url);
        }
    };
    
    var bindEventToList = function (rootSelector, selector, callback, eventName) {
        var eName = eventName || 'click';
        $(rootSelector).on(eName, selector, function () {
            var competition = ko.dataFor(this);
            callback(competition);
            return false;
        });
    };

    function refresh() {
        return datacontext.getCompetitions(competitions);
    }
    
    var vm = {
        activate: activate,
        competitions: competitions,
        title: 'Competitions',
        viewAttached: viewAttached,
        refresh: refresh
    };

    return vm;
});