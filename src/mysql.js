var mysql      = require('mysql');

export default async (value) => {
    try {
    	console.log('dfs')

        const conn = mysql.createConnection({
        	host     : 'localhost',
		  user     : 'root',
		  password : 'root',
		  database : 'testdb'
        });
         await conn.connect()

  
  		
        const result = await conn.query('insert into photos(path) values( '+JSON.stringify(value)+' )')
        conn.end()
        console.log('db input success');
    } catch (err) {
    	console.log("db input failed");	
    	conn.end();
 			
    }

}