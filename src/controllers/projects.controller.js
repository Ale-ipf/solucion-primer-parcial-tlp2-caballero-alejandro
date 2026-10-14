// * ARCHIVO A COMPLETAR
import {
  ProjectModel,
  ProjectTechnologyModel,
  TechnologyModel,
  UserModel,
} from "../models/index.js";

export const createProject = async (req, res) => {
  try {
    // TODO: 1. Crear el project con los datos del body que ya pasaron la validación.
    const project = await ProjectModel.create(req.body);
    // ? Revisar de dónde debe salir el leader del proyecto.
    // TODO: 2. Asociar al project las technologies recibidas.
    if (req.body.technologies && req.body.technologies.length > 0) {
      const technologies = await TechnologyModel.findAll({
        where: { id: req.body.technologies },
      });
      await project.addTechnologies(technologies);
    }
    // TODO: 3. Responder con código 201 y el project con sus technologies y su leader.
    return res.status(201).json({ msg: "Proyecto creado con éxito", project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllProjects = async (_req, res) => {
  try {
    // TODO: 1. Listar todos los projects incluyendo su leader (sin la password) y sus technologies, y responder con código 200 y los projects..
    const projects = await ProjectModel.findAll({
      include: [
        { model: UserModel, as: "leader", attributes: { exclude: ["password"] } },
        { model: TechnologyModel, as: "technologies" }
      ]
    });
    return res.status(200).json({ msg: "Proyectos listados con éxito", projects });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyProjects = async (req, res) => {
  try {
    // TODO: 1. Listar los projects cuyo leader sea el usuario logueado, incluyendo sus technologies, y responder con código 200 y los projects.
    const projects = await ProjectModel.findAll({
      where: { leader_id: req.user.id },
      include: [
        { model: TechnologyModel, as: "technologies" }
      ]
    });
    return res.status(200).json({ msg: "Mis proyectos listados con éxito", projects });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateProject = async (req, res) => {
  try {
    // TODO: 1. Actualizar el project con los datos recibidos.
    const [rowsUpdated] = await ProjectModel.update(req.body, {
      where: { id: req.params.id }
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    // TODO: 2. Reemplazar sus technologies si vienen en el body.
    if (req.body.technologies && req.body.technologies.length > 0) {
      const project = await ProjectModel.findByPk(req.params.id);
      const technologies = await TechnologyModel.findAll({
        where: { id: req.body.technologies },
      });
      await project.setTechnologies(technologies);
    }
    // TODO: 3. Responder con código 200 y el project actualizado, incluyendo su leader y sus technologies.
    const updatedProject = await ProjectModel.findByPk(req.params.id, {
      include: [
        { model: UserModel, as: "leader", attributes: { exclude: ["password"] } },
        { model: TechnologyModel, as: "technologies" }
      ]
    });
    return res.status(200).json({ msg: "Proyecto actualizado con éxito", project: updatedProject });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    // TODO: 1. Eliminar el project y responder con código 204 sin devolver ningún mensaje.
    const rowsDeleted = await ProjectModel.destroy({
      where: { id: req.params.id }
    });
    if (rowsDeleted === 0) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
