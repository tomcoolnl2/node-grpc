
module.exports.defaultEvents = call => {
    
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