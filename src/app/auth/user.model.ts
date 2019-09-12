export class User{
    
    public nombre:string;
    public uid: string;
    public email: string; 

    constructor(obj:dataObj){
        this.nombre = obj &&obj.nombre || null;
        this.uid = obj &&obj.uid || null;
        this.email = obj &&obj.email || null;
    }

}

interface dataObj{
    uid: string;
    email: string;
    nombre: string;
}