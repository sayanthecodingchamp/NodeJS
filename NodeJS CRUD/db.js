const Pool=require('pg').Pool;

const pool=new Pool({
    user:"postgres",
    host:"localhost",
    database:"students",
    password:"29102002",
    port:8080,
});

module.exports=pool