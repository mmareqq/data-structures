const Tree = require('./modules/tree');

function prettyPrintBST(node, prefix = '', isLeft = true) {
   if (!node) {
      return;
   }

   if (node.right) {
      prettyPrintBST(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
   }

   console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);

   if (node.left) {
      prettyPrintBST(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
   }
}

function randomNumsArr(size, min = 1, max = 100) {
   const arr = [];
   while (size > 0) {
      arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
      size -= 1;
   }

   return arr;
}

const arr = randomNumsArr(50)
const myTree = new Tree(arr);

prettyPrintBST(myTree.root);


