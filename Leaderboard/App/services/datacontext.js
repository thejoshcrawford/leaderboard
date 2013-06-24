define(['services/logger', 'durandal/system', 'config', 'services/model'],
    function (logger, system, config, model) {

        var EntityQuery = breeze.EntityQuery;
        var manager = configureBreezeManager();
        var entityNames = model.entityNames;
        
        var getCompetitonById = function (competitionId, competitionObservable) {
            // 1st - fetchEntityByKey will look in local cache 
            // first (because 3rd parm is true) 
            // if not there then it will go remote
            return manager.fetchEntityByKey(
                entityNames.competition, competitionId, true)
                .then(fetchSucceeded)
                .fail(queryFailed);

            // 2nd - Refresh the entity from remote store (if needed)
            function fetchSucceeded(data) {
                return competitionObservable(data.entity);
            }
        };

        var getCompetitions = function (competitionsObservable) {

            var query = EntityQuery.from('competitions')
                .orderBy('name');

            return manager.executeQuery(query)
                .then(querySucceeded)
                .fail(queryFailed);

            function querySucceeded(data) {
                if (competitionsObservable) {
                    competitionsObservable(data.results);
                }
                log('Retrieved competitions from remote data source', data, true);
            }
        };

        var getAthletes = function (athletesObservable) {

            var query = EntityQuery.from('athletes')
                .orderBy('firstName');

            return manager.executeQuery(query)
                .then(querySucceeded)
                .fail(queryFailed);

            function querySucceeded(data) {
                if (athletesObservable) {
                    athletesObservable(data.results);
                }
                log('Retrieved athletes from remote data source', data, true);
            }
        };
        
        var cancelChanges = function () {
            manager.rejectChanges();
            log('Cancelled changes.', null, true);
        };

        var saveChanges = function() {
            return manager.saveChanges()
                .then(saveSucceeded)
                .fail(saveFailed);

            function saveSucceeded(saveResult) {
                log('Saved data successfully.', saveResult, true);
            }
            
            function saveFailed(error) {
                var msg = 'Saved failed: ' + getErrorMessages(error);
                log(msg, error, true);
                error.message = msg;
                throw error;
            }
        };

        var primeData = function () {
            return Q.all([getAthletes(), getCompetitions()]);
        };

        var createCompetition = function() {
            return manager.createEntity(entityNames.competition);
        };

        var hasChanges = ko.observable(false);

        manager.hasChangesChanged.subscribe(function(eventArgs) {
            hasChanges(eventArgs.hasChanges);
        });

        var datacontext = {
            createCompetition: createCompetition,
            getCompetitionById: getCompetitonById,
            getCompetitions: getCompetitions,
            getAthletes: getAthletes,
            hasChanges: hasChanges,
            primeData: primeData,
            saveChanges: saveChanges,
            cancelChanges: cancelChanges
        };
        return datacontext;

        function queryFailed(error) {
            log('Error getting data. ' + error.message, error, system.getModuleId(datacontext), true);
        }
        
        function getErrorMessages(error) {
            var msg = error.message;
            if (msg.match(/validation error/i)) {
                return getValidationMessages(error);
            }
            return msg;
        }
        
        function getValidationMessages(error) {
            try {
                return error.entitiesWithErrors.map(function(entity) {
                    return entity.entityAspect.getValidationErrors().map(function(valError) {
                        return valError.errorMessage;
                    }).join('; <br/>');
                }).join('; <br/>');
            } catch(e) {
                return 'validation error';
            }
        }

        function log(msg, data, showToast) {
            logger.log(msg, data, system.getModuleId(datacontext), showToast);
        }

        function configureBreezeManager() {
            breeze.NamingConvention.camelCase.setAsDefault();
            var mgr = new breeze.EntityManager(config.remoteServiceName);
            model.configureMetadataStore(mgr.metadataStore);
            return mgr;
        }
    });