// import LinkedList from "./modules/linkedList";
// const HashMap = require('./modules/hashMap');
const Tree = require('./modules/tree')

// const list = new LinkedList();
// list.append("dog");
// list.append("cat");
// list.prepend('turtle')
// list.insertAt('snake', 1)
// list.toString();
// console.log("");

// const test = new HashMap();

// test.set('apple', 'red');
// test.set('banana', 'yellow');

// console.log('Keys:', test.keys());
// console.log('Values:', test.values());

// console.log(test)


function prettyPrintBST(node, prefix = "", isLeft = true) {
  if (!node) {
    return;
  }

  if (node.right) {
    prettyPrintBST(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }

  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

  if (node.left) {
    prettyPrintBST(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

 
const arr = [0, 1, 2, 3, 4, 5, 6, 6, 7, 8, 6]
const myTree  = new Tree(arr)
prettyPrintBST(myTree.root)
