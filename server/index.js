
const { Server, ServerCredentials } = require('grpc')
const { GreetService } = require('../server/definitionLoader')


function greet(
    { request: { first_name, last_name } },
    callback
) {
    callback(null, { result: `${first_name} ${last_name}` })
}

function greetManyTimes(call) {

    const { request: { greeting: { first_name, last_name } } } = call

    let count = 0;
    let intervalId = setInterval(() => {
    
        call.write({ result: count % 2 ? last_name : first_name })
        
        count += 1
        if (count > 9) {
            clearInterval(intervalId)
            call.end()
        }

    }, 1000)
}

function main() {

    const server = new Server()
    server.addService(GreetService.service, { greet, greetManyTimes })
    server.bind('127.0.0.1:50051', ServerCredentials.createInsecure())
    server.start()

    console.log('Server running on 127.0.0.1:50051')
}

main()