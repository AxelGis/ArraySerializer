"use strict";
const ASCII_START = 34; //skip empty chars
const ASCII_END = 65535; //last ascii char
/**
 * Serialize array
 * @param arr
 * @returns
 */
const serialize = (arr) => {
    if (arr.length > 1000) {
        throw new Error('Max 1000 numbers!');
    }
    arr.sort((a, b) => a - b);
    const compressed = [];
    let split = '';
    for (let i = 0; i < arr.length; i++) {
        const currentNum = arr[i].toString();
        if (split === '') {
            split = currentNum;
        }
        else if (+(split + '000' + currentNum) <= ASCII_END) {
            split += '000' + currentNum;
        }
        else {
            compressed.push(+split);
            split = currentNum;
        }
    }
    if (split !== '') {
        compressed.push(+split);
    }
    const serializedArr = compressed.map((num) => String.fromCharCode(num + ASCII_START)).join('');
    return serializedArr;
};
/**
 * Deserialize string
 * @param str
 * @returns
 */
const deserialize = (str) => {
    const deserializedArr = str.split('');
    let result = [];
    for (const char of deserializedArr) {
        const decoded = char.charCodeAt(0) - ASCII_START;
        const decodedStr = decoded.toString();
        if (decodedStr.includes('000')) {
            result.push(...decoded.toString().split('000'));
        }
        else {
            result.push(decodedStr);
        }
    }
    return result.map((ch) => +ch);
};
/**
 * Get random number between min and max
 * @param min
 * @param max
 * @returns
 */
const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
/**
 * Generate tests
 * @param condition
 * @returns
 */
const generateTests = (condition) => {
    const array = [];
    switch (condition) {
        case "random50":
            for (let i = 0; i < 50; i++) {
                array.push(getRandom(1, 300));
            }
            break;
        case "random100":
            for (let i = 0; i < 100; i++) {
                array.push(getRandom(1, 300));
            }
            break;
        case "random500":
            for (let i = 0; i < 500; i++) {
                array.push(getRandom(1, 300));
            }
            break;
        case "random1000":
            for (let i = 0; i < 1000; i++) {
                array.push(getRandom(1, 300));
            }
            break;
        case "1sign":
            for (let i = 1; i < 100; i++) {
                array.push(getRandom(1, 9));
            }
            break;
        case "2sign":
            for (let i = 10; i < 100; i++) {
                array.push(i);
            }
            break;
        case "3sign":
            for (let i = 100; i < 301; i++) {
                array.push(i);
            }
            break;
        case "repeat3":
            for (let i = 1; i < 301; i++) {
                array.push(i, i, i);
            }
            break;
    }
    return array;
};
const main = () => {
    const tests = ['random50', 'random100', 'random500', 'random1000', '1sign', '2sign', '3sign', 'repeat3'];
    tests.map((test) => {
        console.log(`\nstarting test: ${test}`);
        const arr = generateTests(test).sort((a, b) => a - b);
        const serialized = serialize(arr);
        const deserialized = deserialize(serialized);
        const simpleSerialized = arr.join('');
        if (simpleSerialized !== deserialized.join('')) {
            throw new Error('Deserialize error');
        }
        const compression = (100 * serialized.length / simpleSerialized.length).toFixed(2);
        console.log(`original: ${simpleSerialized.length} - serialized: ${serialized.length}`);
        console.log(`compression: ${compression}%`);
    });
};
main();
