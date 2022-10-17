const credentials = require('./credentials')

const mongoose = require('mongoose')
const env = process.env.NODE_ENV || "development"
const { connectionString } = credentials.mongo[env]
if(!connectionString) {
    console.error('MongoDB connection string missing!')
    process.exit(1)
}
mongoose.connect(connectionString, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', err => {
    console.error('MongoDB error: ' + err.message)
    procuess.exit(1)
})
db.once('open', () => console.log('MongoDB connection established'))

