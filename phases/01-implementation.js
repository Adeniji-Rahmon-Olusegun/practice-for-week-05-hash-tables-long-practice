class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.count = 0;
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
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here
    if ((this.count /this.capacity) >= 0.7) {
      this.resize();
    }

    let index = this.hashMod(key);
    let keyVal = new KeyValuePair(key, value);

    if (!this.data[index]) {
      this.data[index] = keyVal;
      this.count++;
    } else {
      let signal = false;
      let temp = this.data[index];

      while (temp) {
        
        if (key === temp.key) {
          temp.value = value;
          signal = true;
        }

        temp = temp.next;
      }

      if (!signal) {
        keyVal.next = this.data[index];
        this.data[index] = keyVal;
        this.count++;
      }
    }
  }


  read(key) {
    // Your code here
    let index = this.hashMod(key);

    let temp = this.data[index];

    if (temp === null) return undefined;

    if (!temp.next && temp.key === key) {
      return temp.value;
    } else {
      
      while (temp) {
        
        if (temp.key === key) {
          return temp.value;
        }

        temp = temp.next
      }

      return undefined;
    }
  }


  resize() {
    // Your code here
    this.capacity = this.capacity * 2;

    let dataCopy = this.data;

    this.data = new Array(this.capacity);

    this.count = 0;

    for (let idx = 0; idx < dataCopy.length; idx++) {
      let pair = dataCopy[idx];
      
      while (pair) {
        this.insert(pair.key, pair.value);

        pair = pair.next;
      }
    }
  }


  delete(key) {
    // Your code here
    let index = this.hashMod(key);
    let temp = this.data[index];
    let prev = null;

    if (temp === null) return "Key not found";
    
    if (!temp.next && temp.key === key) {
      this.data[index] = null;
      this.count--;
      return;
    } else {
      while (temp) {
        if (temp.key === key && prev === null) {
          this.data[index] = temp.next;
          this.count--;
          return;
        } else if (temp.key === key) {
          prev.next = temp.next;
          temp = temp.next;
          
          this.count--;
          return;
        }

        prev = temp;
        temp = temp.next;
      }
    }

    return "Key not found";
  }
}

let ht = new HashTable(2);

ht.insert("key1", "value1")
ht.insert("key2", "value2")
ht.insert("key3", "value3")
ht.insert("key5", "value5")
ht.insert("key9", "value9")
ht.insert("key10", "value10")

console.log(ht.hash("chin"));


// console.log("Before resize: ", ht.capacity, ht.data);
// console.log("=================");
//ht.resize();
//console.log("After resize", ht.capacity, ht.data);
//console.log(ht.count)

// console.log("Before Deletion:", ht.count, ht.data);
// console.log("=================");


// console.log(ht.delete("key-4"));
// console.log(ht.delete("key-2"));
// console.log("After Deletion:", ht.count, ht.data);

//console.log(ht.read("key-2"));
// console.log(ht.read("key-21"));



module.exports = HashTable;