
const { Server, ServerCredentials } = require('grpc')
const { GreetService, CalculatorService } = require('../server/definitionLoader')
const { primeFactorization } = require('./primeFactorization')


function greet(
    { request: { first_name, last_name } },
    callback
) {
    callback(null, { result: `${first_name} ${last_name}` })
}

function greetManyTimes(call) {

    const { request: { greeting: { first_name, last_name } } } = call

    let count = 0
    let intervalId = setInterval(() => {
    
        call.write({ result: count % 2 ? last_name : first_name })
        
        if (++count > 9) {
            clearInterval(intervalId)
            call.end()
        }

    }, 1000)
}

function calculate(call) {
    
    const { request: { calculation: { input } } } = call
    const primeNumbers = primeFactorization(input)

    let count = 0
    let intervalId = setInterval(() => {
    
        call.write({ result: primeNumbers[count] })
        
        if (++count >= primeNumbers.length) {
            clearInterval(intervalId)
            call.end()
        }

    }, 500)
    
    call.write({ result: input })
}

function main() {

    const server = new Server()
    // server.addService(GreetService.service, { greet, greetManyTimes })
    server.addService(CalculatorService.service, { calculate })
    server.bind('127.0.0.1:50051', ServerCredentials.createInsecure())
    server.start()

    console.log('Server running on 127.0.0.1:50051')
}

main()