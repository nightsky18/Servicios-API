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
        const empleado = await Empleado.findById(req.params.id).populate('jefe', 'nombre');
        if (!empleado) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }
        res.status(200).json(empleado);
    } catch (error) {
        res.status(500).json({ mensaje: 'ID no válido o error de servidor', error: error.message });
    }
};

/**
 * @desc    Crear un nuevo empleado
 * @route   POST /api/empleados
 */
const createEmpleado = async (req, res) => {
    try {
        // Mongoose aplicará automáticamente las validaciones de tu Schema
        const nuevoEmpleado = new Empleado(req.body);
        const empleadoGuardado = await nuevoEmpleado.save();
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
 * @desc    Eliminar un empleado
 * @route   DELETE /api/empleados/:id
 */
const deleteEmpleado = async (req, res) => {
    try {
        const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id);
        if (!empleadoEliminado) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }
        res.status(200).json({ mensaje: 'Empleado eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar', error: error.message });
    }
};

module.exports = {
    getEmpleados,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
};