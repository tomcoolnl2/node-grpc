
const path = require('path')
const protoLoader = require('@grpc/proto-loader')
const { loadPackageDefinition } = require('grpc')


const protoPath = path.join(__dirname, '..', 'protos', 'greet.proto')

const protoDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const { GreetService } = loadPackageDefinition(protoDefinition).greet

module.exports = { GreetService }