// // CHALENGE 11
// // // -------------------------------------------------------------------------------------
// let myString = "1,2,3,EE,l,z,e,r,o,_,w,e,b,_,s,c,h,o,o,l,2,0,z",
//   solution = myString
//     .split("")
//     .map((ele) => (ele === "_" ? " " : ele))
//     .filter((ele) => isNaN(parseInt(ele)) && !ele.startsWith(","))
//     .slice(1, -1)
//     .reduce((acc, current) => `${acc}${current}`);
// console.log(solution);

let a = [10, 30, 2, 70, 14, 0];

let b = a.reduce((acc, current) => {
  return acc > current ? acc : current;
});

console.log(b);
