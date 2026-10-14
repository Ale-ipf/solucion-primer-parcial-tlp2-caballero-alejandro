// * ARCHIVO A COMPLETAR
import { body } from "express-validator";
import {
  ProjectModel,
  TechnologyModel,
  UserModel,
} from "../../models/index.js";

export const createProjectValidation = [
  // TODO: 1. Validar code: obligatorio y único (ProjectModel).
  body("code")
    .notEmpty()
    .withMessage("El código es obligatorio")
    .custom(async (value) => {
      const project = await ProjectModel.findOne({ where: { code: value } });
      if (project) {
        throw new Error("El código ya está en uso");
      }
    }),
  // TODO: 2. Validar name y description como obligatorios.
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descripción es obligatoria"),
  // TODO: 3. Validar status: opcional y limitado a los estados permitidos.
  body("status")
    .optional()
    .isIn(["pending", "in_progress", "completed"])
    .withMessage("El estado no es válido"),
  // TODO: 4. Validar start_date como fecha válida y budget como número positivo, ambos obligatorios.
  body("start_date")
    .isDate()
    .withMessage("La fecha de inicio no tiene un formato válido"),
  body("budget")
    .isFloat({ min: 0 })
    .withMessage("El presupuesto debe ser un número positivo"),
  // TODO: 5. Validar leader_id: debe existir y pertenecer a un usuario activo (UserModel).
  body("leader_id")
    .isInt()
    .withMessage("El ID del líder no es válido")
    .custom(async (value) => {
      const user = await UserModel.findByPk(value);
      if (!user || !user.active) {
        throw new Error("El líder no existe o no está activo");
      }
    }),
  // TODO: 6. Validar technologies: lista de ids que existan (TechnologyModel).
  body("technologies")
    .isArray()
    .withMessage("Las tecnologías deben ser una lista")
    .custom(async (value) => {
      const technologies = await TechnologyModel.findAll({ where: { id: value } });
      if (technologies.length !== value.length) {
        throw new Error("Una o más tecnologías no existen");
      }
    })
  // ? Un usuario eliminado lógicamente no puede ser líder: comprobar que la búsqueda lo deje afuera.
];

export const updateProjectValidation = [
  // TODO: 7. Validar code como opcional y único, excluyendo el propio proyecto que se edita.
  body("code")
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage("El código debe tener entre 3 y 20 caracteres")
    .custom(async (value, { req }) => {
      if (value) {
        const project = await ProjectModel.findOne({ where: { code: value } });
        if (project && project.id !== req.params.id) {
          throw new Error("El código ya está en uso");
        }
      }
    }),
  // TODO: 8. Validar name y description como opcionales y no vacíos.
  body("name")
    .optional()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("La descripción no puede estar vacía"),
  // TODO: 9. Validar status, start_date y budget como opcionales, con las mismas reglas que al crear.
  body("status")
    .optional()
    .isIn(["pending", "in_progress", "completed"])
    .withMessage("El estado no es válido"),
  body("start_date")
    .optional()
    .isDate()
    .withMessage("La fecha de inicio no tiene un formato válido"),
  body("budget")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("El presupuesto debe ser un número positivo"),
  // TODO: 10. Validar leader_id como opcional, existente y de un usuario activo.
  body("leader_id")
    .optional()
    .isInt()
    .withMessage("El ID del líder no es válido")
    .custom(async (value) => {
      if (value) {
        const user = await UserModel.findByPk(value);
        if (!user || !user.active) {
          throw new Error("El líder no existe o no está activo");
        }
      }
    }),
  // TODO: 11. Validar technologies como opcional, con ids que existan.
  body("technologies")
    .optional()
    .isArray()
    .withMessage("Las tecnologías deben ser una lista")
    .custom(async (value) => {
      if (value) {
        const technologies = await TechnologyModel.findAll({ where: { id: value } });
        if (technologies.length !== value.length) {
          throw new Error("Una o más tecnologías no existen");
        }
      }
    })
  // ? Para saber qué proyecto se edita, el id se obtiene de los parámetros de la ruta (req.params).
];
