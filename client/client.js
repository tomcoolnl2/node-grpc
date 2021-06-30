
const grpc = require('grpc')
const { Calculator, CalculateRequest } = require('../server/protos/calculate_pb')
const { CalculateServiceClient } = require('../server/protos/calculate_grpc_pb')


function main() {
    
    const client = new CalculateServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    )

    const request = new CalculateRequest()

    const calculation = new Calculator()
    calculation.setA(5)
    calculation.setB(2)
    
    request.setCalculation(calculation)
    
    client.calculate(request, (error, response) => {

        if (!error) {
            console.log('response', response.getResult())
        }
        else {
            console.error(error)
        }
    })
}

main()