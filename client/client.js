
const grpc = require('grpc')
const { Greeting, GreetRequest } = require('../server/protos/greet_pb')
const { GreetServiceClient } = require('../server/protos/greet_grpc_pb')


function main() {
    
    const client = new GreetServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    )

    const request = new GreetRequest()

    const greeting = new Greeting()
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