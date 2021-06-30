
const grpc = require('grpc')
const greets = require('../server/protos/greet_pb')
const service = require('../server/protos/greet_grpc_pb')


function  greet(call, callback) {
    let greeting = new greets.GreetResponse()
    console.log(call.request.getGreeting())
    greeting.setResult('Hello', call.request.getGreeting().getFirstName())
    callback(null, greeting)
}

function main() {

    const server = new grpc.Server()
    server.addService(service.GreetServiceService, { greet: greet })
    server.bind('127.0.0.1: 50051', grpc.ServerCredentials.createInsecure())
    server.start()

    console.log('Server running on 127.0.0.1: 50051')
}

main()