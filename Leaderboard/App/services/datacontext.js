define(['services/logger', 'durandal/system', 'config', 'services/model'],
    function (logger, system, config, model) {

    var EntityQuery = breeze.EntityQuery,
        manager = configureBreezeManager();

    var getCompetitions = function(competitionsObservable) {
        
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
            .orderBy('name');

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

    var primeData = function() {
        return Q.all([getAthletes(), getCompetitions()]);
    };

    var datacontext = {
        getCompetitions: getCompetitions,
        getAthletes: getAthletes,
        primeData: primeData
    };
    return datacontext;
        
    function queryFailed(error) {
        log('Error getting data. ' + error.message, error, system.getModuleId(datacontext), true);
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