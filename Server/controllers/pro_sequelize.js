import sequelize, { Op } from 'sequelize'
import { CalcRequest, RequestVariant } from "../models/sequelize/index.js";

const getCalcRequestsBySearch = async (pageNumber, pageSize, where__query) => {
    return await CalcRequest.findAndCountAll({
        include: [{
            model: RequestVariant,
        }],
        where: where__query,
        offset: pageNumber*pageSize,
        limit: pageSize,
        order: [
            ['code', 'ASC'],
        ],            
        distinct: true,
    });
}


export const getCalcRequests = async (req, res) => {
    try {
        const searchText = (req.query?.searchtext || "").toLowerCase();
        const activePeriod = req.query?.period || "";
        const pageNumber = req.query?.pageNumber || 0;
        const pageSize  = req.query?.pageSize || 50;
        
        const where__query = searchText ? {
            [Op.or]: [
                sequelize.where(
                    sequelize.fn('lower', sequelize.col('code')),
                    { [Op.like]: `%${searchText}%` }),
                    sequelize.where(
                        sequelize.fn('lower', sequelize.col('name')),
                        { [Op.like]: `%${searchText}%` }),
            ]
        } : {
            code: {
                [Op.like]: `${activePeriod}%`
            }
        }

        const { count, rows } = await getCalcRequestsBySearch(pageNumber, pageSize, where__query)

        return res.json({
            count: count,
            requests: rows,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ //500
            message: "Не удалось получить список заявок",
        });
    };
};

export const checkCalcRequestCode = async (req, res) => {
    try {
        const { count, _ } = await getCalcRequestsBySearch(1, 1, {
            code: req.query?.code, 
            id: { [Op.ne] : req.query?.id} 
            })

        return res.json({
            count: count,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ //500
            message: "Не удалось проверить код заявки",
        });
    };
};

export const getDistinctValuesByField = async (req, res) => {
    try {
        const fieldName = req.query.field
        const values = await CalcRequest.findAll({
            attributes: [sequelize.fn('DISTINCT', sequelize.col(fieldName)), fieldName],
            order: [
                [fieldName, 'ASC'],
            ],            
        })
        .then(data => data.map(item => item[`${fieldName}`] ? item[`${fieldName}`].trim() : ''))
        .then(data => data.filter((item, index) => {
            return data.indexOf(item) === index
        }))
        return res.json({
            values,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ //500
            message: "Не удалось получить список городов",
        });
    };
};