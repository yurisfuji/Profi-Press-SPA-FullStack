import { DataTypes } from "sequelize"

const CalcRequestSchema = {
  code: {
    type: DataTypes.CITEXT,
    allowNull: false,
    unique: true
  },
  previousRequestId: DataTypes.INTEGER,
  name: DataTypes.CITEXT,
  notes: DataTypes.STRING(256),
  isRequestCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deliveryCity: DataTypes.STRING(64),
  deliveryDate: DataTypes.DATEONLY,
  manager: DataTypes.STRING(64),
  authorCreate: DataTypes.STRING(64),
  authorLastModif: DataTypes.STRING(64),
};

export default CalcRequestSchema;
