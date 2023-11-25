const ASCII_START = 34;   //skip empty chars

const serialize = (arr: number[]): string => {
  if(arr.length > 1000) {
    throw new Error('Max 1000 numbers!');
  }

  arr.sort((a,b) => a - b);

  const serializedArr = arr.map((num) => String.fromCharCode(num + ASCII_START)).join('');
  return serializedArr;
}

const deserialize = (str: string): number[] => {
  const deserializedArr = str.split('').map((char) => char.charCodeAt(0) - ASCII_START);
  return deserializedArr;
}

const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateTests = (condition: string) => {
  const array: number[] = [];
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
      for (let i = 1; i < 10; i++) {
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
      for (let i = 1; i < 301; i++) {
        array.push(i, i, i);
      }
      break;
  }
  return array;
}

const main = () => {
  const tests = ['random50','random100','random500','random1000','1sign','2sign','3sign','repeat3'];

  tests.map((test: string) => {
    console.log(`\nstarting test: ${test}`);

    const arr = generateTests(test).sort((a,b) => a - b);
    const serialized = serialize(arr);
    const deserialized = deserialize(serialized);
    const simpleSerialized = arr.join('');

    if(simpleSerialized !== deserialized.join('')){
      throw new Error('Deserialize error');
    }

    const compression = (100 * serialized.length / simpleSerialized.length).toFixed(2);

    console.log(arr);
    console.log(`serialized: ${serialized}\n`);
    console.log(`original: ${simpleSerialized.length} - serialized: ${serialized.length}`);
    console.log(`compression: ${compression}%`);
  });
}

main();
