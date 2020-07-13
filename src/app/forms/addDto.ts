import {Role} from '../models/role';

export class AddDto{

    constructor(public id: number, public login: string, public password: string, public repeatPassword: string, public email: string, public firstName: string, public lastName: string, public birthday: string, public role: Role ){
            
    }
}


