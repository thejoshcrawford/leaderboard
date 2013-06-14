define(['durandal/system', 'services/logger', 'durandal/plugins/router', 'config', 'services/datacontext'],
    function(system, logger, router, config, datacontext) {
        var shell = {
            activate: activate,
            router: router
        };
        return shell;

        function activate() {
            return datacontext.primeData()
                .then(boot)
                .fail(failedInitialization);
        }

        function failedInitialization(error) {
            log('App initialization failed: ' + error.message, error, system.getModuleId(datacontext), true);
        }
        
        function boot()
        {
            logger.log('Leaderboard has started.',
                null,
                system.getModuleId(shell),
                true);
            router.map(config.routes);
            return router.activate(config.startModule);
        }
    });