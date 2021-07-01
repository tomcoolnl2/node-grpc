
const { credentials } = require('grpc')
const { defaultEvents } = require('../shared/defaultEvents')
const { GreetService, CalculatorService } = require('../shared/definitionLoader')
const { sleep } = require('../shared/sleep')


// const client = new GreetService('localhost:50051', credentials.createInsecure())
const client = new CalculatorService('localhost:50051', credentials.createInsecure())

function bindEvents(call) {

    call.on('data', response => {
        console.log('response', response.result)
    })

    defaultEvents(call)
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
    
    sbindEvents(call)
}

function callCalculate() {

    const request = {
        calculation: { input: 120 }
    }

    const call = client.calculate(request)
    
    bindEvents(call)
}

async function callComputeAverage() {
    
    const c = [63, 5, 31, 7, 98]

    const request = {
         input: null
    }

    const call = client.computeAverage(request, (error, response) => {
        if (!error) {
            console.log('server response: ', response.result)
        }
        else {
            console.error(error)
        }
    })

    for (let i = 0, n; n = c[i]; i += 1) {
        await sleep(750)
        call.write({ input: n })
    }

    call.end()
}

function main() {
    // callGreeting()
    // callGreetManyTimes()
    // callCalculate()
    callComputeAverage()
}

main()