const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');
// const faker = require('faker');




    const uri = "mongodb+srv://jaider:12345@cluster0.djqhev2.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
async function main() {

    try {
        await client.connect();
        const database = client.db('SOFF_Monda');
        // Invoque sus funciones aquí

        //Insert many

        // for (let i = 0; i < 3; i++) {
        //     const proveedores= [{
        //         nombre: faker.name.firstName(),
        //         apellido: faker.name.lastName(),
        //         edad: faker.datatype.number({min: 18, max: 80}),
        //         email: faker.internet.email(),
        //         telefono: faker.phone.number('501-###-###'),
        //         },
        //         {
        //             nombre: faker.name.firstName(),
        //         apellido: faker.name.lastName(),
        //         edad: faker.datatype.number({min: 18, max: 80}),
        //         email: faker.internet.email(),
        //         telefono: faker.phone.number('501-###-###'),
        //         }
            
                
        //     ];
        //     const result = await agregarClientes(database,'proveedores', proveedores);
        // }
        //     console.log('campos agregados con exito');

            //Agregar datos
        // for (let i = 0; i < 3; i++) {
        //     const proveedores= {
        //     nombre: faker.name.firstName(),
        //     apellido: faker.name.lastName(),
        //     edad: faker.datatype.number({min: 18, max: 80}),
        //     email: faker.internet.email(),
        //     telefono: faker.phone.number('501-###-###')
        //     };
        
        //     const result = await agregarCliente(database,'proveedores', proveedores);
        // }
        // console.log('campos agregados con exito');

        ////////////////////////////

        //visualizar clientes
        // const result = await getclientes(database);
        // console.log(result);

        //////////////////////////////////

        //encontrar cliente especifico
        // await Encontrarcliente(client, "Maxine")
        // await Encontrarcliente(client, "Dahlia")
        // await getclientes (client, limit=10)

        /////////////////////////////////7
        //eliminar cliente
        // await DeleteMany (client, "Van")
        // await DeleteOne (client, 8);

        //actualizar cliente
        // await actualizaredad(client, "1", {edad:"66"})

        //pipline
        // filtrarcliente(client, "3", "3")

        // //lookup
        // await obtenerlookup (client, collectionUnir, localField, foreignField, foreignField, as)


        //drop
        await deletecollecion (client);


        
        
    } finally {
        
        // await client.close();
    }
}

main().catch(console.error);

// Agregue las funciones que van a operar sobre la base de datos a partir de esta linea




    //INSERT ONE

    //CREATE DE Clientes
// const agregarCliente = (db,coleccion, proveedores) => {
//     try{
//         db.collection(coleccion).insertOne(proveedores);

//     }catch(error){
//         console.log(error);
//     }
// };

    //CREATE de proveedores

// const agregarCliente = (db,coleccion, proveedores) => {
//     try{
//         db.collection(coleccion).insertOne(proveedores);

//     }catch(error){
//         console.log(error);
//     }
// };

    //CREATE de empleados

// const agregarCliente = (db,coleccion, proveedores) => {
//     try{
//         db.collection(coleccion).insertOne(proveedores);

//     }catch(error){
//         console.log(error);
//     }


        //DROP

// };


    //INSERT MANY

    


    // FIND ONE

    async function encontrarUsario(db, colecion, name){
        const result = await db.collection(colecion).findOne({nombre:name});
        if(result){
            console.log(`se encontro el cliente: ${name}`);
            console.log(result);
        }else{
            console.log(`No se encontro el usuario: ${nombre}`);
        }
    }

    //UPDATE ONE CON UPSERT
    async function actualizarcliente(client, userName, userUpdate){
        
        const result = await client.db("SOFF_Monda").collection("clientes").findOne({nombre:userName},{$set:userUpdate},{upsert:true});
        console.log(`Se actualizo un cliente ${userName}` );
        console.log(result);
    }

            //UPDATE MANY sin UPSERT

    async function actualizaredad(client, antedad, newedad){
        const result = await client.db("SOFF_Monda").collection("clientes").updateMany({edad:antedad},{$set:newedad});
        console.log(`se actualizar la edad ${newedad}`);
    }

    //DELETE ONE

    async function DeleteOne (client, byenombre){
        const result = await client.db("SOFF_Monda").collection("clientes").deleteOne({nombre:byenombre});
        console.log(`se elimino un clientes con el nombre: ${byenombre}`)
        
    }


    //DELETE MANY

    async function DeleteMany (client, byenombre){
        const result = await client.db("SOFF_Monda").collection("clientes").deleteMany({nombre:byenombre});
        console.log(`se eliminaron clientes con el nombre: ${byenombre}`)
        
    }

    ////VIEW
    async function getclientes (client, limit=10) {
        const result = await client.db("SOFF_Monda").collection("clientes").find().sort({nombre:1}).limit(limit);
        const results = await result.toArray();
        try{

            return results.forEach((clientes)=>{console.log(`nombre:${clientes.nombre}`);})
        }catch(error){
            console.log(error);
        }
    }



////// READ
async function Encontrarcliente(client, nombrecliente) {
    const result = await client.db("SOFF_Monda").collection("clientes").findOne({nombre:nombrecliente});
    
    if(result){
      console.log(`Se encontro la propiedad nombre: ${nombrecliente}`);
      console.log(result);
    }
    else{
      console.log(`no se encontro la propiedad nombre: ${nombrecliente}`);
    }
   }

   //piplines

   async function filtrarcliente(client, fedad, ftelefono){
    const result = await client.db("SOFF_Monda").collection("clientes").aggregate(
        [
            {
              '$match': {
                'edad': fedad
              }
            }, {
              '$project': {
                'telefono': ftelefono
              }
            }, {
              '$sort': {
                '_id': -1
              }
            }
          ])

          if(result){
            console.log(result);
          }else{
            console.log(``);
          }
   };
    

   // lookup

   const obtenerlookup =(client, collectionUnir, localField, foreignField, foreignField, as) =>{
    try{
        const result = client.db("SOFF_Monda").collection(clientes).aggregate([
            {
                $lookup:{
                    from: collectionUnir,
                    localField: localField,
                    foreignField: foreignField,
                    as: as
                }
            },
            {
                $match:{
                    $expr:{$gte:[{$size: `$${as}`}, 1]}
                }
            },
            
        ])
        return result
    }catch(error){
        console.log(error);
    }
   }

   // Drop
   const deletedb = (client) =>{
    try{
        const result = client.db("SOFF_Monda").dropDatabase()
        console.log("Base de datos eliminada");
    }catch (error){
        console.log(error);
    }
   }

   const deletecollecion = (client) =>{
    try{
        const result = client.db("SOFF_Monda").collection(proveedores).drop()
        console.log("Colecion eliminada");
    }catch (error){ 
        console.log(error);
    }
   }




