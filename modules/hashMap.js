class HashMap {
   constructor() {
      this.hashMap = [];
      this.capacity = 16;
      this.loadFactor = 0.5;
      this.entries = 0;
   }

   hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
         hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
      }

      return hashCode;
   }

   set(key, value) {
      const hash = this.hash(key);
      if (hash > this.capacity)
         throw new Error(
            `Hash - (${hash}) is greater than max capacity of hash (${this.capacity})`
         );

      if (!this.hashMap[hash]) this.entries += 1;
      this.hashMap[hash] = { key, value };
      this.#checkFillState();
   }

   get(key) {
      const hash = this.hash(key);
      return this.hashMap[hash] || null;
   }

   has(key) {
      const hash = this.hash(key);
      return this.hashMap[hash] === undefined ? false : true;
   }

   remove(key) {
      const hash = this.hash(key);
      if (this.hashMap[hash] !== undefined) {
         this.hashMap[hash] = undefined;
         this.entries -= 1;
         return true;
      }
      return false;
   }

   length() {
      return this.entries;
   }

   clear() {
      this.hashMap = [];
   }

   keys() {
      let keys = [];
      this.hashMap.forEach(bucket => {
         if (bucket === undefined) return;
         keys.push(bucket.key);
      });
      return keys;
   }

   values() {
      let values = [];
      this.hashMap.forEach(bucket => {
         if (bucket === undefined) return;
         values.push(bucket.value);
      });
      return values;
   }

   buckets() {
      let buckets = [];
      this.hashMap.forEach(bucket => {
         if (bucket === undefined) return;
         buckets.push(bucket);
      });
      return buckets;
   }

   #checkFillState() {
      const bar = Math.floor(this.loadFactor * this.capacity);
      if (this.entries > bar) this.capacity *= 2;
   }
}

module.exports = HashMap;
