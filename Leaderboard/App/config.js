define( function() {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';

    remoteServiceName = 'api/breeze';

    var routes = [{
        url: 'competitions',
        moduleId: 'viewmodels/competitions',
        name: 'Competiton List',
        visible: true
    }, {
        url: 'map',
        moduleId: 'viewmodels/map',
        name: 'Competition Map',
        visible: true
    }, {
        url: 'athletes',
        moduleId: 'viewmodels/athletes',
        name: 'Athletes',
        visible: false
    }, {
        url: 'competitionadd',
        moduleId: 'viewmodels/competitionadd',
        name: 'Add Competition',
        visible: false,
        caption: '<i class="icon-plus"></i> Add Competition',
        settings: {admin: true}
    }, {
        url: 'competitiondetail/:id',
        moduleId: 'viewmodels/competitiondetail',
        name: 'Edit Competition',
        visible: false
    }];

    var startModule = 'competitions';

    return {
        debugEnabled: ko.observable(true),
        remoteServiceName: remoteServiceName,
        routes: routes,
        startModule: startModule
    };
})