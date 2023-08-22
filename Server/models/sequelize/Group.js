import { DataTypes } from "sequelize"

const GroupSchema = {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    avatarUrl: {
      type: DataTypes.STRING,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true      
    },    
};

export default GroupSchema;