
const path = require('path')
const protoLoader = require('@grpc/proto-loader')
const { loadPackageDefinition } = require('grpc')


const greetingProtoPath = path.join(__dirname, '..', 'protos', 'greet.proto')
const calculatorProtoPath = path.join(__dirname, '..', 'protos', 'calculator.proto')

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
}

const greetingProtoDefinition = protoLoader.loadSync(greetingProtoPath, options)
const calculatorProtoDefinition = protoLoader.loadSync(calculatorProtoPath, options)

const { GreetService } = loadPackageDefinition(greetingProtoDefinition).greet
const { CalculatorService } = loadPackageDefinition(calculatorProtoDefinition).calculator

module.exports = { 
    GreetService,
    CalculatorService
}