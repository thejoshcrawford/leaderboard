define(function () {
    
    var entityNames = {
        competition: 'Competition'
    };

    var model = {
        configureMetadataStore: configureMetadataStore,
        entityNames: entityNames
    };
    return model;
    
    
    
    function configureMetadataStore(metadataStore) {
        metadataStore.registerEntityTypeCtor('Athlete', null, athleteInitializer);
    }
    
    function athleteInitializer(athlete) {
        // computed here
    }
});