'use strict'

const { log } = require("console");

class Collection {
    constructor(model) {
        this.model = model
    }

    async get(id) {
        if (id) {
            const fineOne = await this.model.findOne({ where: { id } })
            return fineOne
        } else {
            const findAll = await this.model.findAll();
            return findAll
        }
    }

    async create(obj) {
        const add = await this.model.create(obj);
        return add;
    }

    // create(record) {
    //     return this.model.create(record);
    //   }

    async update(id, obj) {
        const updated = await this.model.update(obj, { where: { id } })
        const newRecord = await this.get(id)
        return newRecord
    }

    async delete(id) {
        const found = await this.get(id)
        const deleted = await this.model.destroy({ where: { id } })
        return `this user has been deleted ${found.id}`;
    }

    async getRelation(id, model,) {
        const records = await this.model.findOne({
            where: { id },
            include: model
        });
        return records;
    }


    async getManyRelation(id, model1, model2) {
        // const postid = id2;
        const records1 = await this.model.findAll({
            where: { id },
            include: [model1, model2]
            
             // Assuming model1 has a foreign key to this.model (the main model)
        });
        return records1;
    }
    async readAll(id, model, model2, model3) {
        const records = await this.model.findOne({
            where: { id },
            include: [
                {
                    model: model,
                    include: [
                        {
                            model: model2,

                        },
                        {
                            model: model3,
                        },

                    ],

                },
            ]
        });
        return records;
    }

    
}

module.exports = Collection;