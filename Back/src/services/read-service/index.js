const FindDefault = require("./find-all/default/index");
const FindStrategy = require("./find-all/default/default-strategy");
const ModelMapper = require("../utils/modelMapper.utils");
const findFkDefault = require("./find-all/Fk/index");
const FindFkStrategy = require("./find-all/Fk/fk-strategy");
const FindExcludingDefault = require("./find-all/Excluding/index");
const FindExcludingStrategy = require("./find-all/Excluding/excluding-strategy");
const FindOneDefault = require("./find-one/default");
const FindOneStrategy = require("./find-one/default/default-strategy");

// Estrategias

class StrategyFactory {

    constructor() {
        this.strategyMap = {
        'Find': {
            default: FindDefault,
            including: FindStrategy
        },
        'FindOne': {
            default: FindOneDefault,
            including: FindOneStrategy
        },
        'FindFk': {
            default: findFkDefault,
            including: FindFkStrategy
        },
        'FindExcluding': {
            default: FindExcludingDefault,
            including: FindExcludingStrategy
        },
        };
    }

    createStrategy(mapping,strategy) {
        const StrategyClass = mapping ? this.strategyMap[strategy].including : this.strategyMap[strategy].default;
        if (!StrategyClass) {
            throw new Error(`Unknown strategy: ${strategy}`);
        }
        return new StrategyClass(mapping && mapping.config);
    }
}


// Servicio
class ReadService {

    constructor(models) {
        this.models = models;
        this.mapper = new ModelMapper(); 
        this.factory = new StrategyFactory();
        this.mapping = null;
    }

    setMapping(modelName) {
        this.mapping = this.mapper.getMapping(modelName);
    }

    async find(model, page, limit) {
        this.setMapping(model.name);
        const strategy = this.factory.createStrategy(this.mapping, "Find");
    return strategy.find(model, page, limit); 
    }

    async findOne(model, id, whereId) {
        this.setMapping(model.name);
        const strategy = this.factory.createStrategy(this.mapping, "FindOne");
    return strategy.findOne(model, id, whereId); 
    }

    async findFk(model, id, whereId, page, limit) {
        this.setMapping(model.name);
        const strategy = this.factory.createStrategy(this.mapping, "FindFk");
    return strategy.find(model, id, whereId, page, limit); 
    }

    async FindExcluding(model, date, whereId, page, limit) {
        this.setMapping(model.name);
        const strategy = this.factory.createStrategy(this.mapping, "FindExcluding");
    return strategy.find(model, date, whereId, page, limit); 
    }
}


module.exports = ReadService;
