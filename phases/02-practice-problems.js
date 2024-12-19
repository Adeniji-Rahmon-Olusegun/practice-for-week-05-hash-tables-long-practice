//const HashTable = require('./01-implementation');
class set {
  constructor() {
    this.value = null;
  }
}

class HashTable {
  constructor(numBuckets) {
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return key % this.capacity;
  }

  insert(val) {
    let strVal = String(val);

    let index = this.hashMod(strVal);
    let temp = this.data[index];

    if (!temp) {
      this.data[index] = val;
      return false;
    } else if (val === temp) {
      return true;
    }
  }

}



function anagrams(str1, str2) {
  // Your code here

  let ht = new HashTable();

  let hashed1 = ht.hash(str1);
  let hashed2 = ht.hash(str2);

  if (hashed1 === hashed2) return true;

  return false;

}


function commonElements(arr1, arr2) {
  // Your code here

}


function duplicate(arr) {
  // Your code here
  let ht = new HashTable(arr.length + 1);

  for (let idx = 0; idx < arr.length + 1; idx++) {
    let num = arr[idx];

    if (ht.insert(num)) {
      return num;
    }
  }
}


function twoSum(nums, target) {
  // Your code here
}


function wordPattern(pattern, strings) {
  // Your code here
}

/****************************************/
let target = 1000000;

arr = [];

for (let i = 0 ; i < target ; i++) {
  arr.push(i);
}

arr.push(123456);

// let ht = new HashTable();

// let num = "503"

// console.log(ht.hashMod(num))

//console.log(arr)
//console.log();
console.log(duplicate(arr));


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];