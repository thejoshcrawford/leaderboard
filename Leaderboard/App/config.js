define( function() {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';

    remoteServiceName = 'api/breeze';

    var routes = [{
        url: 'competitions',
        moduleId: 'viewmodels/competitions',
        name: 'Competitions',
        visible: true
    }, {
        url: 'athletes',
        moduleId: 'viewmodels/athletes',
        name: 'Athletes',
        visible: true
    }, {
        url: 'competitionadd',
        moduleId: 'viewmodels/competitionadd',
        name: 'Add Competition',
        visible: false,
        caption: '<i class="icon-plus"></i> Add Competition',
        settings: {admin: true}
    }];

    var startModule = 'competitions';

    return {
        routes: routes,
        startModule: startModule,
        remoteServiceName: remoteServiceName
    };
})