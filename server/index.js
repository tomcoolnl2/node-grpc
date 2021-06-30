
const { Server, ServerCredentials } = require('grpc')
const { GreetResponse } = require('../server/protos/greet_pb')
const { GreetServiceService } = require('../server/protos/greet_grpc_pb')


function  greet({ request }, callback) {
    const response = new GreetResponse()
    const greeting = request.getGreeting()
    response.setResult('Hello: ' + greeting.getFirstName() + greeting.getLastName())
    callback(null, response)
}

function main() {

    const server = new Server()
    server.addService(GreetServiceService, { greet })
    server.bind('127.0.0.1:50051', ServerCredentials.createInsecure())
    server.start()

    console.log('Server running on 127.0.0.1:50051')
}

main()