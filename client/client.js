
const grpc = require('grpc')
const greets = require('../server/protos/greet_pb')
const service = require('../server/protos/greet_grpc_pb')


function main() {
    
    const client = new service.GreetServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    )

    const request = new greets.GreetRequest()

    const greeting = new greets.Greeting()
    greeting.setFirstName('Tom')
    greeting.setLastName('Cool')
    
    request.setGreeting(greeting)
    
    client.greet(request, (error, response) => {

        if (!error) {
            console.log('response', response.getResult())
        }
        else {
            console.error(error)
        }
    })
}

main()