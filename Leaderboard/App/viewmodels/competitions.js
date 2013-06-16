﻿define(['services/datacontext', 'durandal/plugins/router'], function (datacontext, router) {
    var competitions = ko.observableArray();
    var initialized = false;
    var isSaving = ko.observable(false);

    function activate() {
        if (initialized) {
            return;
        }
        initialized = true;
        return refresh();
    }
    
//    var viewAttached = function (view) {
//        bindEventToList(view, '.competition-brief', gotoDetails);
//    };
//
//    var gotoDetails = function (selectedCompetition) {
//        if (selectedCompetition && selectedCompetition.competitionId()) {
//            var url = '#/competitiondetail/' + selectedCompetition.competitionId();
//            router.navigateTo(url);
//        }
    //    };
    
    var cancel = function () {
        datacontext.cancelChanges();
    };
    
    var hasChanges = ko.computed(function () {
        return datacontext.hasChanges();
    });

    var save = function () {
        isSaving(true);
        return datacontext.saveChanges().fin(complete);
        
        function complete() {
            isSaving(false);
        }
    };

    var canSave = ko.computed( function() {
        return hasChanges() && !isSaving();
    });
    
//    var bindEventToList = function (rootSelector, selector, callback, eventName) {
//        var eName = eventName || 'click';
//        $(rootSelector).on(eName, selector, function () {
//            var competition = ko.dataFor(this);
//            callback(competition);
//            return false;
//        });
//    };

    function refresh() {
        return datacontext.getCompetitions(competitions);
    }
    
    var vm = {
        activate: activate,
        canSave: canSave,
        competitions: competitions,
        hasChanges: hasChanges,
        title: 'Competitions',
//viewAttached: viewAttached,
        refresh: refresh,
        save: save,
        cancel: cancel
    };

    return vm;
});