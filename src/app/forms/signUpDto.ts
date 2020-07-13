
export class SignUpDto{

    constructor(public id: number, public login: string, public password: string, public repeatPassword: string, public email: string, public firstName: string, public lastName: string, public birthday: string, public captcha: string){
            
    }
}


