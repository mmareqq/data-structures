export default class LinkedList {
  constructor(value = null) {
    this.list = new Node(value);
  }

  append(value, list = this.list) {
    if (list === this.list && !this.list.value) {
      const node = new Node(value);
      this.list = node;
      return;
    }
    if (list.nextNode) return this.append(value, list.nextNode);
    const node = new Node(value);
    list.nextNode = node;
  }

  prepend(value) {
    const node = new Node(value);
    node.nextNode = this.list; // Copy reference to 2nd item in the list
    this.list = node;
  }

  size(list = this.list) {
    if (!list) return 0;
    if (!list.nextNode) return 1;
    return 1 + this.size(list.nextNode);
  }

  head() {
    return this.list;
  }

  tail(list = this.list) {
    if (!list.nextNode) return list;
    return this.tail(list.nextNode);
  }

  at(index, list = this.list) {
    if (index > this.size()) return null;
    const subList = this.getSubList(index);
    return subList.value;
  }

  getSubList(index, list = this.list) {
    if (index <= 0) return list;
    return this.getSubList(index - 1, list.nextNode);
  }

  pop(list = this.list) {
    if (!list.nextNode.nextNode) {
      list.nextNode = null;
      return;
    }
    this.pop(list.nextNode);
  }

  contains(value, list = this.list) {
    if (!list.nextNode) {
      if (list.value === value) return true;
      return false;
    }
    if (list.value === value) return true;
    return true && this.contains(value, list.nextNode);
  }

  // WITH CHATGPT ):
  find(value, list = this.list, index = 0) {
    if (!list) return -1;
    if (value === list.value) return index;
    return this.find(value, list.nextNode, index + 1);
  }

  toString(list = this.list) {
    let string = "";
    let addToString = (list = this.list) => {
      if (!list) {
        string += `null`;
        return;
      }
      string += `( ${list.value} ) --> `;
      addToString(list.nextNode);
    };
    addToString();
    console.log(string);
  }

  insertAt(value, index) {
    if (index > this.size()) return -1;
    if (index === 0) {
      this.prepend(value)
      return
    }
    const subList = this.getSubList(index - 1);
    const node = new Node(value);
    node.nextNode = subList.nextNode;
    subList.nextNode = node;
  }

  removeAt(index) {
    const subList = this.getSubList(index - 1);
    subList.nextNode = subList.nextNode.nextNode;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}