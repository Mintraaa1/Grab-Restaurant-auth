import sequelize from "./db";
import Sequelize from "sequelize";

import User from "./user.model";
import Role from "./role.model";

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Role = Role;

//Associations
db.User.belongsToMany(db.Role, {
  through: "User_roles"
});
db.Role.belongsToMany(db.User, {
  through: "User_roles"
});
export default db;