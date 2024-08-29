// const board = [];
// for (let i = 0; i < 8; i++) {
//    board[i] = [];
//    for (let j = 0; j < 8; j++) {
//       board[i][j] = [i, j];
//    }
// }

class HashMap {
   constructor() {
      this.hashMap = [];
   }

   hash([i, j]) {
      let hashCode = 0;
      hashCode = i * 10 + j;
      return hashCode;
   }

   set(key, value) {
      const hash = this.hash(key);

      if (!this.hashMap[hash]) this.entries += 1;
      this.hashMap[hash] = { key, value };
   }

   get(key) {
      const hash = this.hash(key);
      return this.hashMap[hash].value || null;
   }

   print() {
      this.hashMap.forEach(element => {
         console.log(element);
      });
   }
}

function knightMoves(target, start = [0, 0]) {
   const graph = new HashMap();
   for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
         const moves = getPossibleMoves([i, j]);
         graph.set([i, j], moves);
      }
   }

   function constructPath(parent, startNode, targetNode) {
      let path = [];
      let currentNode = targetNode;

      while (currentNode !== null) {
         path.push(currentNode);
         currentNode = parent[currentNode];
      }

      return path.reverse(); // To get the path from startNode to targetNode
   }

   function bfs(start, target) {
      // Edge case: If start is the target
      if (isArrEqual(start, target)) return start;

      let queue = [[start]]; // Queue to keep track of paths
      let visited = []; // Set to track visited nodes
      visited.push(start);

      while (queue.length > 0) {
         let path = queue.shift(); // Dequeue the first path
         let node = path[path.length - 1]; // Get the last node in the path

         // Explore neighbors
         const neighbors = graph.get(node);
         for (let neighbor of neighbors) {
            if (!includesArray(visited, neighbor)) {
               // Create a new path that includes the neighbor
               let newPath = [...path, neighbor];

               if (isArrEqual(neighbor, target)) {
                  return newPath; // Return the path if target is found
               }
               // Enqueue the new path
               queue.push(newPath);
               visited.push(neighbor);
            }
         }
      }
      return null;
   }

   const output = bfs(target, start);
   console.log(output);
   return output;
}

const move = knightMoves([1, 6], [6, 1]);

function getPossibleMoves([row, col]) {
   const movesCoords = [];
   for (let i = -2; i <= 2; i++) {
      if (i === 0) continue;

      let j = Math.abs(i) > 1 ? -1 : -2;
      const endRow = row + i;
      let endCol = col + j;

      if (isOnBoard([endRow, endCol])) movesCoords.push([endRow, endCol]);

      j *= -1;
      endCol = col + j;

      if (isOnBoard([endRow, endCol])) movesCoords.push([endRow, endCol]);
   }

   return movesCoords;
}

function includesArray(arr, value) {
   for (let element of arr) {
      if (isArrEqual(element, value)) {
         return true;
      }
   }
   return false;
}
function isArrEqual(arr1, arr2) {
   return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function isOnBoard([row, col]) {
   if (row <= 7 && row >= 0 && col <= 7 && col >= 0) return true;
   return false;
}
