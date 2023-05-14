let val = "15min";

// Option 1
function makeSpackeBetweenNumberAndString(string) {
  const result = string.split("");
  let spaceIndex = null;
  for (let i = 0; i < result.length && !spaceIndex; i++) {
    if (!Number(result[i])) spaceIndex = i;
  }
  return [
    ...result.slice(0, spaceIndex),
    " ",
    ...result.slice(spaceIndex),
  ].join("");
}

// Option 2
function makeSpaceBetweenNumberAndString2(string) {
  const spaceIndex = string.search(/\D/);
  return string.slice(0, spaceIndex) + " " + string.slice(spaceIndex);
}

const result = makeSpackeBetweenNumberAndString(val);
const result2 = makeSpaceBetweenNumberAndString2(val);

console.log(result, result2);
