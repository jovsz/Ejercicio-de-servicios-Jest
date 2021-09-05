import fs from "fs/promises";
import path from "path";
import faker from "faker";

class AcademloDb {

    static dbPath = path.resolve("db", "db.json");

    static findAll = async() => {
        try{
            let data = await fs.readFile(this.dbPath, "utf8");
            return JSON.parse(data);
        }catch(error){
            throw new Error("Hubo un error al tratar de obtener todos los registros de la DB");
        }
    }

    static findById = async (id) => {
        try{
            let data = await fs.readFile(this.dbPath, "utf8");
            let db = JSON.parse(data);
            return db.find(item => item.id === id);
        }catch(error){
            throw new Error("Hubo un error al tratar de obtener el registro de la DB");
        }
    }

    static create = async(obj, id) => {
        try{
            let data = await this.findAll();
            let lastId = data.length + 1;
            const item = obj;
            item.id = lastId;

            data.push(item);
            await fs.writeFile(this.dbPath, JSON.stringify(data));
            data = await this.findById(lastId);
            if(data.id == lastId) {
                return item;
            }
            throw new Error("Error al registrar el nuevo usuario");
        }catch(error){
            throw new Error(error);
        }
    }

    static update = async(obj, id) => {
        try{
            let data = await this.findAll();
    
            let result = data.findIndex(item => { return item.id === id } );
            if (result === -1){
                throw new Error(`No se encontro algun registro con el ${id}`);
            }
            let newObj = { id,...obj };
            data[result] = newObj
            await fs.writeFile(this.dbPath, JSON.stringify(data));
            return newObj
        }catch(error){
            throw new Error(error);
        }
    }

    static delete = async(id) => {
        try{
            let data = await this.findAll();
            let result = data.findIndex(item => item.id === id);
            if (result === -1){
                return false;
            }
            data.splice(result, 1);
            await fs.writeFile(this.dbPath, JSON.stringify(data));
            return true
        }catch(error){
            throw new Error(error)
        }
    }

    static clear = async() => {
        try{
            await fs.writeFile(this.dbPath, JSON.stringify([]));
        }catch(error){
            throw new Error("Hubo un error al tratar de vaciar la DB");
        }
    }

    static populateDB = async(size) => {
        let userArr = [];
        for(let i = 0; i<size; i++){
            let userObj = {
                id: i + 1,
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                email: faker.internet.email().toLowerCase()
            };

            userArr.push(userObj);
        }

        try{
            await fs.writeFile(this.dbPath, JSON.stringify(userArr));
            return userArr;
        }catch(error){
            throw new Error("Hubo un error al insertar en la base de datos");
        }
    }

}

export default AcademloDb;