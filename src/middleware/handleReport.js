'use strict'
const modules = require('../models')
// This function searches to determine if the record exists and if the report has been added before.


async function handleReport(req, res, next) {
    try {
        const record = req.body
        record["userId"] = req.users.userId;
        console.log(record.userId);

        console.log("------------------------")
        if (await reportIsValid(record.userId, record.actionId, record.actionType)) {
            const respons = await modules.reportCollection.create(record);
            res.status(201).json(respons);
        } else res.status(400).json("Data Not Valid !!");
    } catch (err) {
        next(err)
    }
}

async function reportIsValid(userId, actionId, actionType) {
    try {
        const existingReportRecord = await modules.report.findOne({ where: { userId: userId, actionId: actionId, actionType: actionType } })
        let dataValid = false

        if (actionType === "comment") {
            const record = await modules.comment.findOne({ where: { id: actionId } })
            dataValid = record
        } else if (actionType === "post") {
            const record = await modules.post.findOne({ where: { id: actionId } })
            dataValid = record
        } else if (actionType === 'user') {
            const record = await modules.user.findOne({ where: { id: actionId } })
            dataValid = record
        }
        return !existingReportRecord && dataValid;
    } catch (err) {
        console.log(err);
    }
}

module.exports = handleReport;