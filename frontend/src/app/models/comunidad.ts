import { User } from './user';


export class Comunidad {

    constructor(nombre='',contraseña='',numIntegrantes=0 ,presupuesto=0, tipo='',users=null) {
        this.nombre = nombre; 
        this.contraseña = contraseña; 
        this.numIntegrantes = numIntegrantes;
        this.presupuesto = presupuesto;
        this.tipo = tipo;
        this.users = users;
    }

    nombre: string;
    contraseña: string;
    numIntegrantes: number; 
    presupuesto; number; 
    tipo: string;
    users: User[];

}
