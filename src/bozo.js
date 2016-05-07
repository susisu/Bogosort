// Bozosort

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

// swaps randomly two elements in the array
function swap(arr) {
    let len = arr.length;
    let i   = Math.floor(Math.random() * len);
    let j   = Math.floor(Math.random() * (len - 1));
    if (j >= i) {
        j = j + 1;
    }
    let temp = arr[i];
    arr[i]   = arr[j];
    arr[j]   = temp;
}

function sort(n) {
    let arr = new Array(n).fill(0).map((_, i) => i);
    shuffle(arr);
    let count = 0;
    while (!test(arr)) {
        swap(arr);
        count += 1;
    }
    return count;
}

function out(x) {
    process.stdout.write(String(x) + "\n");
}

function main() {
    const N = Math.abs(parseInt(process.argv[2]) | 0);
    const M = Math.abs(parseInt(process.argv[3]) | 0);
    out("# Bozosort");
    out("## N = " + N.toString());
    out("## M = " + M.toString());
    let sum   = 0;
    let sumSq = 0;
    for (let i = 0; i < M; i++) {
        let count = sort(N);
        sum   += count;
        sumSq += count * count;
    }
    let avg    = sum / M;
    let stddev = Math.sqrt((sumSq - sum * sum / M) / (M - 1));
    out("## AVG = " + avg.toString());
    out("## STDDEV = " + stddev.toString());
}

main();
