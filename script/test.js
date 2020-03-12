function sum(a, b) {

  if (!b) {
    return x =>  a + x;
  }
  return a + b
}

//const result = sum(7, 3);
const result2 = sum(7)(3);

//console.log(result)
console.log(result2)