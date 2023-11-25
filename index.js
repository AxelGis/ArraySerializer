"use strict";
const ASCII_START = 34; //skip empty chars
const ASCII_END = 65535; //max ascii char
const serialize = (arr) => {
    if (arr.length > 100) {
        throw new Error('Max 1000 numbers!');
    }
    arr.sort((a, b) => a - b);
    const compressed = [];
    let sequense = '';
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 1 || arr[i] > 300) {
            throw new Error('Invalid number!');
        }
        if (Number(sequense + arr[i]) <= ASCII_END) {
            sequense += arr[i];
        }
        else {
            compressed.push(+sequense);
            sequense = '';
        }
    }
    if (sequense != '') {
        compressed.push(+sequense);
    }
    const serializedArr = compressed.map((num) => String.fromCharCode(num + ASCII_START)).join('');
    return serializedArr;
};
const deserialize = (str) => {
    const deserializedArr = str.split('').map((char) => char.charCodeAt(0) - ASCII_START);
    return deserializedArr;
};
const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const generateTests = (condition) => {
    const array = [];
    switch (condition) {
        case "random50":
            for (let i = 0; i < 50; i++) {
                array.push(getRandom(0, 300));
            }
            break;
        case "random100":
            for (let i = 0; i < 100; i++) {
                array.push(getRandom(0, 300));
            }
            break;
        case "random500":
            for (let i = 0; i < 500; i++) {
                array.push(getRandom(0, 300));
            }
            break;
        case "random1000":
            for (let i = 0; i < 1000; i++) {
                array.push(getRandom(0, 300));
            }
            break;
        case "1sign":
            for (let i = 0; i < 10; i++) {
                array.push(i);
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
            for (let i = 0; i < 301; i++) {
                array.push(i, i, i);
            }
            break;
    }
    return array;
};
const main = () => {
    const tests = ['random50', 'random100', 'random500', 'random1000', '1sign', '2sign', '3sign', 'repeat3'];
    tests.map((test) => {
        console.log(test);
        const arr = generateTests('random50').sort((a, b) => a - b);
        const serialized = serialize(arr);
        const deserialized = deserialize(serialized);
        const simpleSerialized = arr.join('');
        if (simpleSerialized !== deserialized.join('')) {
            console.log(arr);
            console.log(deserialized);
            throw new Error('Deserialize error');
        }
        const compression = (100 * serialized.length / deserialized.length).toFixed(2);
        console.log(arr);
        console.log(`serialized: ${serialized}`);
        console.log(`compression: ${compression}%`);
    });
};
main();
