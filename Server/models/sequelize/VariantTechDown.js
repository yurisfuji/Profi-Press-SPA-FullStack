import { DataTypes } from "sequelize"

const VariantTechDownSchema = {
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  notes: DataTypes.STRING(256),
  paperTypeId: DataTypes.INTEGER,
  printedFormatWidth: DataTypes.FLOAT,
  printedFormatHeight: DataTypes.FLOAT,
  productSizeWidth: DataTypes.FLOAT,
  productSizeHeight: DataTypes.FLOAT,
  numberOfPaintsCMYK: DataTypes.SMALLINT,
  numberOfPantones: DataTypes.SMALLINT,
  numberOfFlexoforms: DataTypes.SMALLINT,
  numberOfGluingPoints: DataTypes.SMALLINT,
  authorCreate: DataTypes.STRING(64),
  authorLastModif: DataTypes.STRING(64),
  authorLastRecalc: DataTypes.STRING(64),
  datetimeLastRecalc: DataTypes.DATE
};

export default VariantTechDownSchema;
