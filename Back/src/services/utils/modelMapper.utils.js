const { modelNames } = require("../../database/constants");

class ModelMapper {

    constructor() {
        this.mappings = {
            Publication: { 
            requiresJoin: true,
                config: {
                    secondaryModel: modelNames.Pet,
                    as: 'pets',
                    attributes: ['name', 'image_url', 'username']
                }   
            },
            Comment: {
            requiresJoin: true,
                config: {
                    secondaryModel: modelNames.Pet,
                    as: 'pet',  
                    attributes: ['name', 'image_url','username']
                },        
            },
            Reaction: {
            requiresJoin: true,
                config: {
                    secondaryModel: modelNames.Pet,
                    as: 'pet',  
                    attributes: ['name', 'image_url','username']
                },        
            }
        };
    }
    
    getMapping(modelName) {
        return this.mappings[modelName]; 
    }
}


module.exports = ModelMapper;
