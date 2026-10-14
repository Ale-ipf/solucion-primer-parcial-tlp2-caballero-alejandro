// * ARCHIVO A COMPLETAR
import { UserModel } from "./user.model.js";
import { ProfileModel } from "./profile.model.js";
import { ProjectModel } from "./project.model.js";
import { TechnologyModel } from "./technology.model.js";
import { ProjectTechnologyModel } from "./project_technology.model.js";

// TODO: 1. Definir la relación 1:1 entre User y Profile con los alias profile (en User) y user (en Profile), usando la FK user_id.
UserModel.hasOne(ProfileModel, { as: "profile", foreignKey: "user_id" });
ProfileModel.belongsTo(UserModel, { as: "user", foreignKey: "user_id" });

// TODO: 2. Definir la relación 1:N entre User y Project con los alias projects (en User) y leader (en Project), usando la FK leader_id.
UserModel.hasMany(ProjectModel, { as: "projects", foreignKey: "leader_id" });
ProjectModel.belongsTo(UserModel, { as: "leader", foreignKey: "leader_id" });

// TODO: 3. Definir la relación N:M entre Project y Technology con los alias technologies y projects, a través de ProjectTechnologyModel y al mismo tiempo configurar la eliminación en cascada para ambos.
ProjectModel.belongsToMany(TechnologyModel, { as: "technologies", through: ProjectTechnologyModel, foreignKey: "project_id", otherKey: "technology_id", onDelete: "CASCADE" });
TechnologyModel.belongsToMany(ProjectModel, { as: "projects", through: ProjectTechnologyModel, foreignKey: "technology_id", otherKey: "project_id", onDelete: "CASCADE" });

// ? Los controladores base de users y technologies ya consultan estas relaciones por alias: deben coincidir.

export {
  UserModel,
  ProfileModel,
  ProjectModel,
  TechnologyModel,
  ProjectTechnologyModel,
};
