const mongoose = require('mongoose')

const addVacationInSeasonListenerSchema = mongoose.Schema({
    email: String, 
    skus: [String],
})
const addVacationInSeasonListener = mongoose.model('VacationInSeasonListener',
    addVacationInSeasonListenerSchema)

    module.exports = addVacationInSeasonListener