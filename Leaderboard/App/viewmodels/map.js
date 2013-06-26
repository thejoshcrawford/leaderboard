define(['services/datacontext'], function (datacontext) {
    var athletes = ko.observableArray();
    var initialized = false;
    var vm = {
        activate: activate,
        athletes: athletes,
        title: 'Athletes',
        refresh: refresh
    };

    return vm;

    function activate() {
        if (initialized) {
            return;
        }
        initialized = true;
        return refresh();
    }

    function refresh () {
        return datacontext.getAthletes(athletes);
    }
    });