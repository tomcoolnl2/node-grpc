
const { credentials } = require('grpc')
const { GreetService, CalculatorService } = require('../server/definitionLoader')


// const client = new GreetService('localhost:50051', credentials.createInsecure())
const client = new CalculatorService('localhost:50051', credentials.createInsecure())

function bindEvents(call) {

    call.on('data', response => {
        console.log('response', response.result)
    })

    call.on('status', status => {
        console.log(status)
    })

    call.on('error', error => {
        console.log(error)
    })

    call.on('end', () => {
        console.log('streaming ended')
    })
}

function callGreeting() {
    const request = {
        greeting: {
            first_name: 'Tom',
            last_name: 'Cool'
        }
    }
    
    client.greet(request, (error, response) => {

        if (!error) {
            console.log('response', response.result)
        }
        else {
            console.error(error)
        }
    })
}

function callGreetManyTimes() {
    
    const request = {
        greeting: {
            first_name: 'Jinglan',
            last_name: 'Cool'
        }
    }

    const call = client.greetManyTimes(request)
    bindEvents(call)
}

function callCalculate() {
    
    const request = {
        calculation: { input: 120 }
    }

    const call = client.calculate(request)
    bindEvents(call)
}

function main() {
    // callGreeting()
    // callGreetManyTimes()
    callCalculate()
}

main()