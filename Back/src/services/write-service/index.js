const create = require("./create");
const update = require("./update-delete");
const updateStrategy = require("./update-delete/update-Strategy");

class StrategyFactory {

    constructor() {
        this.strategyMap = {
            "Update Strategy": {
                default: updateStrategy,
            },
            "Update Normal": {
                default: update,
            },
            "Create Normal": {
                default: create,
            },
        };
    }

    createStrategy(strategy) {
        const StrategyClass = this.strategyMap[strategy].default;
        if (!StrategyClass) {
            throw new Error(`Unknown strategy: ${strategy}`);
        }
        return new StrategyClass();
    }
}




class WriteService {

    constructor() {
        this.factory = new StrategyFactory();
        
    }  

    update(model, id, data, whereId) {
        let modelStrategy = "Update Strategy";
        const modelName = model.options.name.singular;
        if(modelName !== "Pet" && modelName !== "Publication") modelStrategy = "Update Normal";
        console.log(modelStrategy, "modelstratergy")
        const strategy = this.factory.createStrategy(modelStrategy);
    return strategy.update(model, id, data, whereId);
    }


    create(model, dataBody) {
        const strategy = this.factory.createStrategy("Create Normal");
    return strategy.create(model, dataBody);
    }
}


module.exports = WriteService;