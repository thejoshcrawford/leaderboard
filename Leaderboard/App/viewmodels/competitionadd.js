define(['services/datacontext', 'durandal/plugins/router', 'durandal/app'], function (datacontext, router, app) {
    var isSaving = ko.observable(false);
    var competition = ko.observable();

    function activate() {
        competition(datacontext.createCompetition());
    }
    
    var cancel = function () {
        router.navigateBack();
    };
    
    var hasChanges = ko.computed(function () {
        return datacontext.hasChanges();
    });
    
    var canSave = ko.computed(function () {
        return hasChanges() && !isSaving();
    });

    var save = function () {
        isSaving(true);
        return datacontext.saveChanges().then(goToEditView).fin(complete);
        
        function goToEditView(result) {
            router.replaceLocation('#/competitions'); // competition().id()
        }
        
        function complete() {
            isSaving(false);
        }
    };

//    var canDeactivate = function() {
//        if (!hasChanges()) {
//            return true;
//        }
//
//        var title = 'You have unsaved changes.';
//        var msg = 'Do you want to leave the screen and cancel your changes?';
//        return app.showMessage(msg, title, ['Yes', 'No'])
//            .then(confirm);
//        
//        function confirm(selectedOption) {
//            if (selectedOption === 'Yes') {
//                cancel();
//            }
//            return selectedOption;
//        }
//    };
    
    var vm = {
        activate: activate,
        canSave: canSave,
//        canDeactivate: canDeactivate,
        competition: competition,
        hasChanges: hasChanges,
        title: 'Competition',
        save: save,
        cancel: cancel
    };

    return vm;
});