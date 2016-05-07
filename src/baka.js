// Bakasort

"use strict";

// tests if the array is sorted
function test(arr) {
    let len = arr.length;
    for (let i = 0; i <= len - 2; i++) {
        if (arr[i] + 1 !== arr[i + 1]) {
            return false;
        } 
    }
    return true;
}

// shuffles the array uniformly at random
function shuffle(arr) {
    let len      = arr.length;
    let shuffled = new Array(len);
    let indices  = new Array(len).fill(0).map((_, i) => i);
    let rest     = len;
    while (rest > 0) {
        let j = Math.floor(Math.random () * rest);
        let i = indices[j];
        shuffled[len - rest] = arr[i];
        indices.splice(j, 1);
        rest -= 1;
    }
    for (let i in arr) {
        arr[i] = shuffled[i];
    }
}

// calculates the energy of the array
function energy(eps, arr) {
    let len = arr.length;
    let e   = 0.0;
    for (let i = 0; i <= len - 2; i++) {
        e += Math.abs(arr[i + 1] - arr[i]) - 1;
    }
    return eps * e;
}

// calculate the energy difference before and after swapping
function deltaEnergy(eps, arr, i, j) {
    let len = arr.length;
    let before = 
          (i === len - 1 ? 0.0 : Math.abs(arr[i + 1] - arr[i]) - 1)
        + (i === 0       ? 0.0 : Math.abs(arr[i] - arr[i - 1]) - 1)
        + (j === len - 1 ? 0.0 : Math.abs(arr[j + 1] - arr[j]) - 1)
        + (j === 0       ? 0.0 : Math.abs(arr[j] - arr[j - 1]) - 1);
    let after =
          (i === len - 1 ? 0.0 : Math.abs(arr[i + 1] - arr[j]) - 1)
        + (i === 0       ? 0.0 : Math.abs(arr[j] - arr[i - 1]) - 1)
        + (j === len - 1 ? 0.0 : Math.abs(arr[j + 1] - arr[i]) - 1)
        + (j === 0       ? 0.0 : Math.abs(arr[i] - arr[j - 1]) - 1);
    return eps * (after - before);
}

// swaps two elements in the array
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i]   = arr[j];
    arr[j]   = temp;
}

// tries to swap randomly two elements in the array
function trySwap(eps, beta, arr) {
    let len = arr.length;
    let i   = Math.floor(Math.random() * len);
    let j   = Math.floor(Math.random() * (len - 1));
    if (j >= i) {
        j = j + 1;
    }
    let deltaE = deltaEnergy(eps, arr, i, j);
    if (deltaE < 0) {
        swap(arr, i, j);
        return true;
    }
    else {
        let p = Math.exp(-beta * deltaE);
        let r = Math.random();
        if (r < p) {
            swap(arr, i, j);
            return true;
        }
        else {
            return false;
        }
    }
}

function sort(eps, beta, n) {
    let arr = new Array(n).fill(0).map((_, i) => i);
    shuffle(arr);
    let tryCount  = 0;
    let swapCount = 0;
    while (!test(arr)) {
        if (trySwap(eps, beta, arr)) {
            swapCount += 1;
        }
        tryCount += 1;
    }
    return [tryCount, swapCount];
}

function out(x) {
    process.stdout.write(String(x) + "\n");
}

function main() {
    const N       = Math.abs(parseInt(process.argv[2]) || 0);
    const M       = Math.abs(parseInt(process.argv[3]) || 0);
    const EPSILON = parseFloat(process.argv[4]) || 0;
    const BETA    = parseFloat(process.argv[5]) || 0;
    out("# Bakasort");
    out("## N = " + N.toString());
    out("## M = " + M.toString());
    out("## EPSILON = " + EPSILON.toString());
    out("## BETA = " + BETA.toString());
    let trySum    = 0;
    let trySumSq  = 0;
    let swapSum   = 0;
    let swapSumSq = 0;
    for (let i = 0; i < M; i++) {
        let counts = sort(EPSILON, BETA, N);
        trySum    += counts[0];
        trySumSq  += counts[0] * counts[0];
        swapSum   += counts[1];
        swapSumSq += counts[1] * counts[1];
    }
    let tryAvg     = trySum / M;
    let tryStddev  = Math.sqrt((trySumSq - trySum * trySum / M) / (M - 1));
    let swapAvg    = swapSum / M;
    let swapStddev = Math.sqrt((swapSumSq - swapSum * swapSum / M) / (M - 1));
    out("## TRY_AVG = " + tryAvg.toString());
    out("## TRY_STDDEV = " + tryStddev.toString());
    out("## SWAP_AVG = " + swapAvg.toString());
    out("## SWAP_STDDEV = " + swapStddev.toString());
}

main();
