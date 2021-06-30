
const path = require('path')
const protoLoader = require('@grpc/proto-loader')
const { loadPackageDefinition, credentials } = require('grpc')


const protoPath = path.join(__dirname, '..', 'protos', 'calculate.proto')
const protoDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const { CalculateService } = loadPackageDefinition(protoDefinition).calculate

const client = new CalculateService(
    'localhost:50051',
    credentials.createInsecure()
)

function main() {
    


    const request = {
        calculation: {
            a: 1,
            b: 6
        }
    }
    
    client.calculate(request, (error, response) => {

        if (!error) {
            console.log('response', response.result)
        }
        else {
            console.error(error)
        }
    })
}

main()