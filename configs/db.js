const oracledb = require('oracledb')

let connection;

connectDb = async () =>{

    console.log("Connecting to Oracle DB");
    
    try{
        connection = await oracledb.getConnection({ user: "fusion", password: 
                                "welcome1", connectionString: "192.168.29.246:1521/FREE" });

        console.log("Connected to OracleDb.");
    }catch (err){
        console.log("Error while connecting to db. Abort!");
    }

}

module.exports =  {
    dbInstance(){
        return connection;
    },
    connectDb
};
