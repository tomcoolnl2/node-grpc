
const path = require('path')
const protoLoader = require('@grpc/proto-loader')
const { loadPackageDefinition, Server, ServerCredentials } = require('grpc')

const protoPath = path.join(__dirname, '..', 'protos', 'calculate.proto')
const protoDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const { CalculateService } = loadPackageDefinition(protoDefinition).calculate


function calculate({ request }, callback) {
    const { a, b } = request.calculation
    callback(null, { result: a + b })
}

function main() {

    const server = new Server()
    server.addService(CalculateService.service, { calculate })
    server.bind('127.0.0.1:50051', ServerCredentials.createInsecure())
    server.start()

    console.log('Server running on 127.0.0.1:50051')
}

main()