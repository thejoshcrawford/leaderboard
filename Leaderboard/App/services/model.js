define(function () {
    
    var model = {
        configureMetadataStore: configureMetadataStore
    };
    
    return model;
    
    function configureMetadataStore(metadataStore) {
        metadataStore.registerEntityTypeCtor('Athlete', null, athleteInitializer);
    }
    
    function athleteInitializer(athlete) {
        // computed here
    }
});