import express from 'express'
import employeeRoutes from './routes/employee.routes.js'

const app = express()

// poder parsear json dentro del body
app.use(express.json())

/**
 * app methods
 * app.get
 * app.post
 * app.put
 * app.delete
 * app.use
 */

/**
 * routes
 */

 app.use(employeeRoutes)

 // fallback o 404
 app.use((req, res, next) => {
    res.status(404).json({
        error: true,
        message: 'Ruta no encontrada'
    })
 })

 export default app