import {Router} from 'express'
import {
    getEmployees, 
    getEmployee,
    createEmployee, 
    updateEmployee, 
    deleteEmployee
} from '../controllers/employee.controller.js'

const router = Router()


/**
 * app = router
 * puedes usar los métodos
 * GET, POST, PUT, DELETE
 */

// app.get('/employees', async (req, res) => {
//     const result = await connection.query('SELECT * FROM employee')
//     res.json(result[0])
// })

router.get('/employees', getEmployees)
router.get('/employees/:id', getEmployee)
router.post('/employees', createEmployee)
router.patch('/employees/:id', updateEmployee)
router.delete('/employees/:id', deleteEmployee)

export default router