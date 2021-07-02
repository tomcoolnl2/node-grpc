
const { Server, ServerCredentials, status } = require('grpc')
const { defaultEvents } = require('../shared/defaultEvents')
const { GreetService, CalculatorService } = require('../shared/definitionLoader')
const { primeFactorization } = require('../shared/primeFactorization')
const { sleep } = require('../shared/sleep')


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

async function greetEveryOne(call) {
    // await sleep()
    call.on('data', ({ greeting: { first_name, last_name } }) => {
        console.log(first_name + ' ' + last_name)
    })

    call.on('error', console.error)

    call.on('status', status => {
        console.log('status', status)
    })

    call.on('end', () => {
        // callback(null, { result })
        call.end()
    })

    for (let i = 1; i < 10; i += 1) {
        call.write({ result: 'Tom Cool ' + i })
        await sleep(2000)
    }

    call.end()
}

async function calculate(call) {

    const { request: { calculation: { input } } } = call

    await primeFactorization(input, async factor => {
        call.write({ result: factor })
        await sleep()
    })

    call.end()
}

function computeAverage(call, callback) {

    let c = []
    let result = null
    const calculateAvarage = n => {
        c.push(n)
        const sum = c.reduce((a, v) => a + v, 0)
        console.log('The sum of : ', c, ' is ', sum)
        return  sum / c.length
    }

    call.on('data', ({ input }) => {
        console.log('computeAverage is retrieving: ', input)
        result = calculateAvarage(input)
        console.log('avarage: ', result)
        console.log('-------------------')
    })
    
    call.on('error', console.error)

    call.on('status', status => {
        console.log('status', status)
    })

    call.on('end', () => {
        callback(null, { result })
    })
}

function findMaximum(call) {
    
    let result = null

    call.on('data', ({ input }) => {
    
        console.log('findMaximum is retrieving: ', input)
        console.log('findMaximum has: ', result)
        console.log('is retrived nr bigger? : ', String(input > result))
        console.log('-------------------')

        if (input > result) {
            result = input
            call.write({ result })
        }
    })
    
    call.on('error', console.error)

    call.on('status', status => {
        console.log('status', status)
    })

    call.on('end', () => {
        call.end()
    })
}

function squareRoot({ request: { input } }, callback) {
    
    console.log('squareRoot: ', input)
    
    if (input >= 0) {
        callback(null, { result: Math.sqrt(input) })
    }
    else return callback({
        code: status.INVALID_ARGUMENT,
        message: 'Not a positive number: ' + input
    })
}

function main() {

    const server = new Server()
    // server.addService(GreetService.service, { greet, greetManyTimes, greetEveryOne })
    server.addService(CalculatorService.service, { calculate, computeAverage, findMaximum, squareRoot })
    server.bind('127.0.0.1:50051', ServerCredentials.createInsecure())
    server.start()

    console.log('Server running on 127.0.0.1:50051')
}

main()