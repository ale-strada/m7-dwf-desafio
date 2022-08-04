import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conn";

export class Pet extends Model {}
Pet.init(
  {
    petName: DataTypes.STRING,
    description: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    pictureURL: DataTypes.STRING,
    ubication: DataTypes.STRING,
  },
  { sequelize, modelName: "pet" }
);
