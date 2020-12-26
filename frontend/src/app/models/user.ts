import { Comunidad } from './comunidad';

export class User {
    constructor(_id = '', name='',firstName='',secondName='',nickName='', email = '', password = ''){
        this._id = _id;
        this.name = name; 
        this.firstName = firstName;
        this.secondName = secondName; 
        this.nickName = nickName; 
        this.email = email;
        this.password = password;
        this.comunidad = new Comunidad(); 
    };
    
    _id: string;
    name: string; 
    firstName: string; 
    secondName: string;
    nickName: string;
    email: string;
    password: string;
    comunidad: Comunidad;
}

