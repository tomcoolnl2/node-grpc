
const { credentials } = require('grpc')
const { GreetService } = require('../server/definitionLoader')

const client = new GreetService('localhost:50051', credentials.createInsecure())


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

    call.on('data', response => {
        console.log('response', response.result)
    })

    call.on('status', status => {
        console.log(status)
    })

    call.on('error', status => {
        console.log(status)
    })

    call.on('end', () => {
        console.log('streaming ended')
    })
}

function main() {
    // callGreeting()
    callGreetManyTimes()
}

main()