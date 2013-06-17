define(['durandal/system', 'services/logger', 'durandal/plugins/router', 'config', 'services/datacontext'],
    function(system, logger, router, config, datacontext) {

        var adminRoutes = ko.computed(function() {
            return router.allRoutes().filter(function(r) {
                return r.settings.admin;
            });
        });

        var shell = {
            activate: activate,
            addCompetition: addCompetition,
            adminRoutes: adminRoutes,
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
        
        function addCompetition(item) {
            router.navigateTo(item.hash);
        }
    });