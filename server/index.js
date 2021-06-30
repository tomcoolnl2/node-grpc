
const { Server, ServerCredentials } = require('grpc')
// const { GreetResponse } = require('../server/protos/greet_pb')
// const { GreetServiceService } = require('../server/protos/greet_grpc_pb')
const { CalculateResponse } = require('../server/protos/calculate_pb')
const { CalculateServiceService } = require('../server/protos/calculate_grpc_pb')


function calculate({ request }, callback) {
    const response = new CalculateResponse()
    const calculation = request.getCalculation()
    response.setResult(calculation.getA() + calculation.getB())
    callback(null, response)
}

function main() {

    const server = new Server()
    server.addService(CalculateServiceService, { calculate })
    server.bind('127.0.0.1:50051', ServerCredentials.createInsecure())
    server.start()

    console.log('Server running on 127.0.0.1:50051')
}

main()