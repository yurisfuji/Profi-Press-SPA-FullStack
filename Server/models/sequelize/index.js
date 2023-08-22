import UserSchema from "./User.js";
import GroupSchema from "./Group.js";
import CalcRequestSchema from "./CalcRequest.js";
import RequestVariantSchema from "./RequestVariant.js";
import VariantTechDownSchema from "./VariantTechDown.js";

export let User = null
export let Group = null
export let CalcRequest = null
export let RequestVariant = null
export let VariantTechDown = null

export async function initModels(db)  {
    User = db.define('user', UserSchema)
    Group = db.define('group', GroupSchema)
    User.Group = User.belongsToMany(Group, { through: 'User_Groups' });
    Group.belongsToMany(User, { through: 'User_Groups' });

    CalcRequest = db.define('calcrequest', CalcRequestSchema)
    RequestVariant = db.define('requestvariant', RequestVariantSchema)
    CalcRequest.hasMany(RequestVariant)
    VariantTechDown = db.define('varianttechdown', VariantTechDownSchema)
    RequestVariant.hasMany(VariantTechDown)
    
    await db.sync({alter: false});
}