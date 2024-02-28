const { modelNames } = require("../../database/constants");

class ModelMapper {

    constructor() {
        this.mappings = {
            Publication: { 
            requiresJoin: true,
            config: {
                secondaryModel: modelNames.Pet,
                as: 'pets',
                attributes: ['name', 'image_url']
            }   
            },
            Comment: {
            requiresJoin: true,
            config: {
                secondaryModel: modelNames.Pet,
                as: 'pet',  
                attributes: ['name', 'image_url']
            }
            }
        };
    }
    
    getMapping(modelName) {
        return this.mappings[modelName]; 
    }
}


module.exports = ModelMapper;