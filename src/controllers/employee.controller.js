import { connection } from '../database/mysql/connection.js'

const errorResponse = {
    error: true,
    message: "something went wrong",
};

export const getEmployees = async (req, res) => {
    try {
        const [result] = await connection.query('SELECT * FROM employee')

        res.json({
            error: false,
            message: "",
            result
        })
    } catch(e) {
        res.send(errorResponse)
    }
}

export const getEmployee = async (req, res) => {

    try{
        const id = req.params.id
        const [result] = await connection.query('SELECT * FROM employee WHERE id = ?', [id])
        const employeeExists = result.length > 0;

        res.json({
            error: !employeeExists,
            message: employeeExists ? "" : "No se encontró usuario",
            result: employeeExists ? result[0] : {}
        })
    } catch(e) {
        res.send(errorResponse)
    }
}

export const createEmployee = async (req, res) => {

    const {name, salary} = req.body
    const [result] = await connection.query("INSERT INTO employee (name, salary) VALUES (?, ?)", [name, salary])

    res.send({
        error: false,
        message: "Usuario registrado",
        data: {
            id: result.insertId,
            name,
            salary
        }
    })
}

export const deleteEmployee = async (req, res) => {

    try {
        const id = req.params.id
        if (typeof id === "undefined" || Number(id) == isNaN){
            throw new Error(`id no está definido`);
        }

        const [result] = await connection.query("DELETE FROM employee WHERE id = ?", [id])
        const message = result.affectedRows > 0
            ? "Se eliminó registro"
            : "No se encontró el id proporcionado"

        res.send({
            error: false,
            message,
        });
    } catch( e ) {
        res.send(errorResponse)
    }
    
}

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const { body } = req
        const bodyProps = Object.keys(body).length
    
        if (typeof id === "undefined" || Number(id) === isNaN) {
            throw new Error("id no encontrado")
        }

        if (bodyProps === 0) {
            throw new Error("no hay datos para actualizar")
        }
        
        let query = "UPDATE employee SET "
      
        Object.entries(body).forEach(([column, value], index) => {
            query += `${column} = ${value}`
            query += (bodyProps - 1) !== index
                ? ", "
                : ""
        });

        query += ` WHERE id = ${id}`

        const [result] = await connection.query(query)
        const hasUpdated = result.affectedRows > 0

        if ( hasUpdated ){
            const updatedUser = await connection.query("SELECT * FROM employee WHERE id = ?", [id]);

            res.send({
                error: false,
                message: "User updated",
                data: updatedUser[0][0]
            })
        }

        res.send({
            error: false,
            message: "Nada que actualizar"
        })

    } catch ( e ) {
        res.send(errorResponse)
    }
}