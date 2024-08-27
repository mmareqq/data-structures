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
      const sortedArr = arr.slice().sort((a, b) => a - b);
      return Array.from(new Set(sortedArr))
   }

   #buildTree(array) {
      if (!array.length) return null;

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

      function dequeue() {
         const node = queue.shift();
         output += node.value + ' -> ';
         enqueue(node);
      };

      function enqueue(node) {
         if (node.left) queue.push(node.left);
         if (node.right) queue.push(node.right);
      }

      while (queue.length > 0) dequeue();

      return output;
   }

   inOrder() {
      let output = [];

      function rec(node) {
         if (node.left) rec(node.left);
         output.push(node.value)
         if (node.right) rec(node.right);
      }
      rec(this.root);
      return output;
   }

   preOrder() {
      let output = [];
      function rec(node) {
         output.push(node.value)
         if (node.left) rec(node.left);
         if (node.right) rec(node.right);
      }
      rec(this.root);
      return output;
   }

   postOrder() {
      let output = [];
      function rec(node) {
         if (node.left) rec(node.left);
         if (node.right) rec(node.right);
         output.push(node.value)
      }
      rec(this.root);
      return output;
   }

   height(node) {
      if (!node || (!node.left && !node.right)) return 0;
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
  
      return Math.max(leftHeight, rightHeight) + 1;
  }
  
   // CHATGPT ):
   depth(node) {
      function depth(currNode, targetNode, currDepth) {
         if (!currNode) return -1;
         if (currNode.value === targetNode.value) return currDepth;
         const leftDepth = depth(currNode.left, targetNode, currDepth + 1);
         if (leftDepth !== -1) return leftDepth;
         return depth(currNode.right, targetNode, currDepth + 1);
      }
      return depth(this.root, node, 0);
   }

   isBalanced(node = this.root) {
         if (!node) return true;
     
         const leftHeight = node.left ? this.height(node.left) : 0;
         const rightHeight = node.right ? this.height(node.right) : 0;
     
         if (Math.abs(leftHeight - rightHeight) > 1) return false;

         return this.isBalanced(node.left) && this.isBalanced(node.right);
   }
     
   rebalance() {
      if(this.isBalanced()) return;
      const arr = this.inOrder()
      this.root = this.#buildTree(arr)
   }
}


module.exports = Tree;