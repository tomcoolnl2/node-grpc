
const RPC_TYPE = {
    SHORT: 1,
    MEDIUM: 2,
    LONG: 3
}

const RPC_DEADLINE = {
    SHORT: 1000,
    MEDIUM: 5000, 
    LONG: 7000
}

function getRPCDeadline(rpcType) {
    
    let t = null
    
    switch(rpcType) {
        case RPC_TYPE.SHORT:
            t = 1000
            break
        case 2:
            t = 7000
            break
        default:
            t = RPC_DEADLINE.MEDIUM
            console.log('Invalid RPC Type. Using default timeout: ' + t)
    }

    return new Date(Date.now() + t)
}

module.exports = { 
    getRPCDeadline,
    RPC_TYPE,
    RPC_DEADLINE
}