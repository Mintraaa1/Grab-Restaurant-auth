import  { DataTypes } from 'sequelize';
import sequelize from "./db.js";
const Role = sequelize.define("Role", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

 Role.sync({ force: true })
    .then(() => {
        Role.create({ id : 1, name: "user" });
        Role.create({ id: 2, name: "moderator" });
        Role.create({ id: 3, name: "admin" });
    }
    ).catch((error) => {
        console.error("Error creating roles:", error);
    });


export default Role;