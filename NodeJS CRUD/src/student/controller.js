const pool=require('../../db');
const queries= require('./queries');


const getStudents = (req,res)=>{
    pool.query(queries.getStudents ,(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getStudentById = (req,res)=>{
    const id=parseInt(req.params.id);

    pool.query(queries.getStudentById,[id],(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const addStudent=(req,res)=>{
    const { name, email, age, dob} = req.body;
    // Check if email exists
    pool.query(queries.checkEmailExists, [email],(error,results)=>{
        if(results.rows.length){
            res.send("Email Already Exists.");
        }

        // Add the student to the DataBase
        pool.query(queries.addStudent,[name, email, age, dob],(error,results)=>{
            if(error) throw error;
            res.status(201).send("Student's Data has been added !!");
            console.log("Student has been created.")
        })
    });
}

const updateStudent=(req,res)=>{
    const id=parseInt(req.params.id);
    const { name }=req.body;

    pool.query(queries.getStudentById,[id],(error,results)=>{
        const noStudentFound= !results.rows.length;
        if(noStudentFound){
            res.send("Student Does not exist in the Database !!");
        }
        pool.query(queries.updateStudent,[name, id],(error,results)=>{
            if(error) throw error;
            res.status(200).send("Student has been Updated !!");
        });
    })
}

const removeStudent=(req,res)=>{
    const id=parseInt(req.params.id);
    pool.query(queries.getStudentById,[id],(error,results)=>{
        const noStudentFound= !results.rows.length;
        if(noStudentFound){
            res.send("Student Does not exist in the Database !!");
        }
        pool.query(queries.removeStudent,[id],(error,results)=>{
            if(error) throw error;
            res.status(200).send("Student has been deleted !!");
        });
    })
}

module.exports={
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,
};