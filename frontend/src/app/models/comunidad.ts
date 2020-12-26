import { User } from './user';


export class Comunidad {

    constructor(name='',password='',numIntegrants=0 ,budget=0, type='',users=[]) {
        this.name = name; 
        this.password = password; 
        this.numIntegrants = numIntegrants;
        this.budget =  budget;
        this.type = type;
        this.users = users;
    }

    name: string;
    password: string;
    numIntegrants: number; 
    budget; number; 
    type: string;
    users: User[];

}
