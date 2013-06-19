define(['services/datacontext',
        'durandal/plugins/router',
        'durandal/system',
        'durandal/app',
        'services/logger'],
    function (datacontext, router, system, app, logger) {
        var competition = ko.observable();
        var isSaving = ko.observable(false);

        var activate = function (routeData) {
            var id = parseInt(routeData.id);
            return datacontext.getCompetitionById(id, competition);
        };

        var goBack = function () {
            router.navigateBack();
        };

        var hasChanges = ko.computed(function() {
            return datacontext.hasChanges();
            return datacontext.hasChanges();
        });

        var cancel = function() {
            datacontext.cancelChanges();
        };

        var canSave = ko.computed(function() {
            return hasChanges() && !isSaving();
        });
        
        var save = function () {
            isSaving(true);
            return datacontext.saveChanges().fin(complete);
            
            function complete() {
                isSaving(false);
            }
        };

        var deleteCompetition = function() {
            var title = 'Delete competition "' + competition().name() + '"?';
            var msg = 'Confirm Delete';
            isSaving(true);
            return app.showMessage(msg, title, ['Yes', 'No'])
                .then(confirmDelete);

            function confirmDelete(selectedOption) {
                if (selectedOption === 'Yes') {
                    competition().entityAspect.setDeleted();
                    save().then(success).fail(failed).fin(finish);
                }
                
                function success() {
                    router.navigateTo('#/competitions');
                }
                
                function failed(error) {
                    cancel();
                    var errorMsg = 'Error: ' + error.message;
                    logger.logError(
                        errorMsg, error, systemId.getModuleId(vm), true);
                }
                
                function finish() {
                    return selectedOption;
                }
            }
        };

        var canDeactivate = function() {
            if (hasChanges()) {
                var title = 'Do you want to leave "' +
                    competition().title() + '" ?';
                var msg = 'Navigate away and cancel your changes?';
                var checkAnswer = function(selectedOption) {
                    if (selectedOption === 'Yes') {
                        cancel();
                    }
                    return selectedOption;
                };
                return app.showMessage(title, msg, ['Yes', 'No'])
                    .then(checkAnswer);
            }
            return true;
        };

        var vm = {
            activate: activate,
            cancel: cancel,
            canDeactivate: canDeactivate,
            canSave: canSave,
            competitoin: competition,
            deleteCompetition: deleteCompetition,
            goBack: goBack,
            hasChanges: hasChanges,
            save: save,
            competition: competition,
            title: 'Competition Details'
        };
        return vm;
    });