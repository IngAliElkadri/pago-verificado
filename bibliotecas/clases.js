class usuarios{
    constructor(id,usuario,correo,clave,nadmin,sucursal,token){
        this.id =id,
        this.usuario = usuario,
        this.correo =correo,
        this.clave=clave,
        this.nadmin=nadmin,
        this.sucursal = sucursal,
        this.token = token
    }
    mostrardatosusuarios(){
        console.log(this.id)
        console.log(this.usuario)
        console.log(this.correo)
        console.log(this.clave)
        console.log(this.nadmin)
        console.log(this.sucursal)
        console.log(this.token)
    }
}
export default usuarios;