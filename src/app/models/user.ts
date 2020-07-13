import { Role } from './role';

export class User {
    public id: number;
    public role: Role;
    public login: string;
    public password: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public birthday: string;
    constructor(id: number, role: Role, login: string, password: string, email: string, firstName: string, lastName: string, birthday: string){
    this.id = id;
    this.role = role;
    this.login = login;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    }
}