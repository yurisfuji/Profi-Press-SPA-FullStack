import { DataTypes } from "sequelize"

const RequestVariantSchema = {
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isOrderSpec: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  notes: DataTypes.STRING(256),
  authorCreate: DataTypes.STRING(64),
  authorLastModif: DataTypes.STRING(64),
};

export default RequestVariantSchema;
