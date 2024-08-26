class Node {
   constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
   }
}

class Tree {
   constructor(arr) {
      this.root = this.#buildTree(this.#formatArr(arr));
   }

   #formatArr(arr) {
      arr.sort();
      return arr.filter((item, index) => arr.indexOf(item) === index);
   }

   #buildTree(array) {
      if (!array.length) return;
      const mid = Math.floor((array.length - 1) / 2);
      const node = new Node(array[mid]);

      node.left = this.#buildTree(array.slice(0, mid));

      node.right = this.#buildTree(array.slice(mid + 1));

      return node;
   }

   deleteItem(value, node = this.root) {
      if (node.left === undefined) return;
      if (node.left.value === value) {
         node.left = null;
         return;
      } else if (node.right.value === value) {
         node.right = null;
         return;
      }
      this.deleteItem(value, node.left);
      this.deleteItem(value, node.right);
   }

   insert(value, node = this.root) {
      if (this.root === null) {
         this.root = value;
         return;
      }

      if (value === node.value) return;

      if (value < node.value) {
         if (!node.left) {
            node.left = new Node(value);
            return;
         }
         this.insert(value, node.left);
      }

      if (value > node.value) {
         if (!node.right) {
            node.right = new Node(value);
            return;
         }
         this.insert(value, node.right);
      }
   }

   // CHATGPT ):
   findNode(value, node = this.root) {
      if (node === null) return null;
      if (value === node.value) return node;

      const leftResult = node.left ? this.findNode(value, node.left) : null;
      if (leftResult !== null) return leftResult;

      return node.right ? this.findNode(value, node.right) : null;
   }

   levelOrder() {
      const queue = [this.root];
      let output = '';

      const dequeue = () => {
         const node = queue.shift();
         output += node.value + ' -> ';
         if(callback) {
            if(myNode.value === node.value)
               return depth
         }
         enqueue(node);
      };

      const enqueue = node => {
         if (node.left) queue.push(node.left);
         if (node.right) queue.push(node.right);
      };

      while (queue.length > 0) dequeue() 

      return output.slice(0, -4);
   }

   inOrder() {
      let output = '';

      function rec(node) {
         if (node.left) rec(node.left);
         output += node.value + ' -> ';
         if (node.right) rec(node.right);
      }
      rec(this.root);
      return output.slice(0, -4);
   }

   preOrder() {
      let output = '';
      function rec(node) {
         output += node.value + ' -> ';
         if (node.left) rec(node.left);
         if (node.right) rec(node.right);
      }
      rec(this.root);
      return output.slice(0, -4);
   }

   postOrder() {
      let output = '';
      function rec(node) {
         if (node.left) rec(node.left);
         if (node.right) rec(node.right);
         output += node.value + ' -> ';
      }
      rec(this.root);
      return output.slice(0, -4);
   }

   height(node) {
      if (!node) return 0;
      return 1 + max(this.height(node.left), this.height(node.right));
   }
   // CHATGPT ):
   depth(node) {
      function depth(currNode, targetNode, currDepth) {
         if(!currNode) return -1
         if(currNode.value === targetNode.value) return currDepth
         const leftDepth = depth(currNode.left, targetNode, currDepth + 1)
         if(leftDepth !== -1) return leftDepth
         return depth(currNode.right, targetNode, currDepth + 1)
      }
      return depth(this.root, node, 0)
   }
}

function max(num1, num2) {
   if (num1 > num2) return num1;
   return num2;
}

module.exports = Tree;
