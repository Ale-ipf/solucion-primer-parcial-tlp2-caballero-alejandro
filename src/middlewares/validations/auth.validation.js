// * ARCHIVO A COMPLETAR
import { body } from "express-validator";
import { UserModel, ProfileModel } from "../../models/index.js";

export const registerValidation = [
  // TODO: 1. Validar username: obligatorio, entre 3 y 20 caracteres y único (UserModel).
  body("username")
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .custom(async (value) => {
      const user = await UserModel.findOne({ where: { username: value } });
      if (user) {
        throw new Error("El nombre de usuario ya está en uso");
      }
    }),
  // TODO: 2. Validar email: obligatorio, con formato válido y único.
  body("email")
    .isEmail()
    .withMessage("El email no tiene un formato válido")
    .custom(async (value) => {
      const user = await UserModel.findOne({ where: { email: value } });
      if (user) {
        throw new Error("El email ya está en uso");
      }
    }),
  // TODO: 3. Validar password: obligatoria, con mínimo de 8 caracteres.
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  // TODO: 4. Validar role: opcional y limitado a los roles permitidos.
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol no es válido"),
  // TODO: 5. Validar profile.employee_number: obligatorio y único (ProfileModel).
  body("profile.employee_number")
    .notEmpty()
    .withMessage("El número de empleado es obligatorio")
    .custom(async (value) => {
      const profile = await ProfileModel.findOne({ where: { employee_number: value } });
      if (profile) {
        throw new Error("El número de empleado ya está en uso");
      }
    }),
  // TODO: 6. Validar profile.first_name y profile.last_name como obligatorios, y profile.phone como opcional.
  body("profile.first_name")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),
  body("profile.last_name")
    .notEmpty()
    .withMessage("El apellido es obligatorio"),
  body("profile.phone")
    .optional()
    .isMobilePhone()
    .withMessage("El teléfono no tiene un formato válido")
  // ? Las unicidades requieren una validación personalizada asíncrona.
];

export const loginValidation = [
  // TODO: 7. Validar email: obligatorio y con formato válido.
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email no tiene un formato válido"),
  // TODO: 8. Validar password: obligatoria.
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
];
