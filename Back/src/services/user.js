const {models} = require('../libs/sequelize');
const BaseService = require('./baseService');


class UserService extends BaseService{
    constructor(){
        super([models.User]); 
    }  

}


module.exports = UserService;