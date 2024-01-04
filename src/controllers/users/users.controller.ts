import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import * as fs from 'fs';
import { Usuario } from './Clase/user.interface';

@Controller('users')
export class UsersController {
    // Variable para leer el archivo json
    private readonly usersDataArchivo = 'src/controllers/users/data/usersData.json';
    // Consultar todos los usuarios del archivo json
    @Get('todosUsuarios')
    todosUsuarios(): any[] {
        const datos = fs.readFileSync(this.usersDataArchivo, 'utf8');
        return JSON.parse(datos);
    }
    // Post para enviar la información y registrar un usuario y devuelve un mensaje
    @Post('registrarUsuario')
    registrarUsuario(@Body() usuario: Usuario): string {
        const users = this.todosUsuarios();
        if(users.length===0){
            usuario.id = 1;
        }else{
            const ultimoIdUsuario = users[users.length - 1];
            usuario.id = ultimoIdUsuario.id + 1;
        }
        users.push(usuario);
        fs.writeFileSync(this.usersDataArchivo, JSON.stringify(users, null, 2));
        return 'Se ha registrado correctamente';
    }
    // Put para enviar la información y modificar los datos del usuario de acuerdo al id que se envie y devuelve un mensaje
    @Put('modificarUsuario/:id')
    modificarUsuario(@Param('id') id: string, @Body() updatedUserData: Partial<Usuario>): string {
        const userId = parseInt(id, 10);
        const usuarios = this.todosUsuarios();
        const userIndex = usuarios.findIndex((user) => user.id === userId);
        if (userIndex === -1) {
            return null;
        }
        usuarios[userIndex] = { ...usuarios[userIndex], ...updatedUserData };
        fs.writeFileSync(this.usersDataArchivo, JSON.stringify(usuarios, null, 2));
        return "Se ha modificado correctamente";
    }
    // Delete para borrar un usuario del archivo json de acuerdo al id que se envie y devuelve un mensaje
    @Delete("borrarUsuario/:id")
    borrarUsuario(@Param("id") id: string) : string{
        const userId=parseInt(id, 10);
        const usuarios=this.todosUsuarios();
        const buscarUsuario=usuarios.filter(user=>user.id!==userId);
        if(buscarUsuario.length===usuarios.length){
            return "No se encontro el usuario";
        }
        fs.writeFileSync(this.usersDataArchivo, JSON.stringify(buscarUsuario, null, 2));
        return "Se ha borrado correctamente";
    }

}
