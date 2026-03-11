const mongoose = require('mongoose')
const Empleado = require('../models/Empleado');

/**
 * @desc    Obtener todos los empleados
 * @route   GET /api/empleados
 */
const getEmpleados = async (req, res) => {
    try {
        // Usamos populate para traer el nombre del jefe en lugar de solo el ID
        const empleados = await Empleado.find().populate('jefe', 'nombre');
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener empleados', error: error.message });
    }
};

/**
 * @desc    Obtener un empleado por ID
 * @route   GET /api/empleados/:id
 */
const getEmpleadoById = async (req, res) => {
    try {
        // verificar formato ObjectId antes de buscar
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ 
                mensaje: 'Empleado no encontrado',
                detalle: 'El ID proporcionado no tiene formato válido'
            });
        }

        const empleado = await Empleado.findById(req.params.id).populate('jefe', 'nombre');
        
        if (!empleado) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }
        
        res.status(200).json(empleado);
    } catch (error) {
        res.status(500).json({ 
            mensaje: 'Error de servidor', 
            error: error.message 
        });
    }
};

/**
 * @desc    Crear uno o múltiples nuevos empleados
 * @route   POST /api/empleados
 */
const createEmpleado = async (req, res) => {
    try {
        let empleadoGuardado;
        // Verificamos si la petición es un arreglo de varios empleados
        if (Array.isArray(req.body)) {
            // Mapeamos para enviar directamente los atributos 'body' si vienen en el formato de test
            const datosParaInsertar = req.body.map(item => item.body ? item.body : item);
            empleadoGuardado = await Empleado.insertMany(datosParaInsertar);
        } else {
            // Flujo normal: insertando un solo empleado
            const nuevoEmpleado = new Empleado(req.body.body ? req.body.body : req.body);
            empleadoGuardado = await nuevoEmpleado.save();
        }
        res.status(201).json(empleadoGuardado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al validar datos', error: error.message });
    }
};

/**
 * @desc    Actualizar parcialmente un empleado
 * @route   PATCH /api/empleados/:id
 */
const updateEmpleado = async (req, res) => {
    try {
        const empleadoActualizado = await Empleado.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,           // Devuelve el documento ya actualizado
                runValidators: true  // Obliga a Mongoose a validar los campos del PATCH
            }
        );

        if (!empleadoActualizado) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }
        res.status(200).json(empleadoActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar', error: error.message });
    }
};

/**
 * @desc    Actualizar completamente un empleado (Reemplazar)
 * @route   PUT /api/empleados/:id
 */
const replaceEmpleado = async (req, res) => {
    try {
        const empleadoReemplazado = await Empleado.findOneAndReplace(
            { _id: req.params.id },
            req.body,
            {
                new: true,           // Devuelve el documento ya reemplazado
                runValidators: true  // Valida los nuevos datos
            }
        );

        if (!empleadoReemplazado) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado para reemplazar' });
        }
        res.status(200).json(empleadoReemplazado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al reemplazar (verifica que enviaste todos los datos requeridos)', error: error.message });
    }
};

/**
 * @desc    Eliminar un empleado
 * @route   DELETE /api/empleados/:id
 */
const deleteEmpleado = async (req, res) => {
    try {
        //  VALIDACIÓN AGREGADA
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ 
                mensaje: 'Empleado no encontrado',
                detalle: 'El ID proporcionado no tiene formato válido'
            });
        }

        const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id);
        
        if (!empleadoEliminado) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }
        
        res.status(200).json({ mensaje: 'Empleado eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ 
            mensaje: 'Error al eliminar', 
            error: error.message 
        });
    }
};


module.exports = {
    getEmpleados,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
    replaceEmpleado,
    deleteEmpleado,
};