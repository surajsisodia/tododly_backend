const oracledb = require('./configs/db.js'); 
const express = require('express');
const cors = require('cors');
const todoRouter = require('./routes/todo.js');

const app = express();
oracledb.connectDb();

app.use(cors());
app.use(express.json());

app.use('/api', todoRouter);


app.listen(4000, () =>{
    console.log("Server is running on port " + 4000);
});

// async function runApp(){
//   let connection;
//   try {
//     connection = await oracledb.getConnection({ user: "fusion", password: "welcome1", connectionString: "192.168.29.246:1521/FREE" });
//     console.log("Successfully connected to Oracle Database");
  
//     // Now query the rows back
//     let result = await connection.execute( 'select * from categories where category_id < 3', [], {resultSet :true});

//     let rs = result.resultSet;
//     let row;

//     while(row = await rs.getRow()){
//         console.log(row);
//     }

//     // console.log(result.rows);
//     rs.close();

//     //connection.close();
//   } catch (err) {
//     console.error(err);
//   } finally {
//     if (connection)
//     {
//       try {
//         await connection.close();
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   }
// }


// runApp();