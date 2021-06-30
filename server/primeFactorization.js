
function primeFactorization(number) {
    
    const result = []

    let k = 2
    let N = number

    do {
        if (N % k === 0) { // if k evenly divides into N
            result.push(k) // this is a factor
            N /= k // divide N by k so that we have the rest of the number left.
        } else {
            k += 1
        }
    } while (N > 1)
    
    return result
}

module.exports = { primeFactorization }