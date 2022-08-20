import { removeDuplicates, mergeSort, getDifference } from "./util.js";

const Node = function (value) {
  const left = null;
  const right = null;
  return { value, left, right };
};

const buildTree = function (array) {
  if (array.length === 0) return null;

  if (array.length === 1) return Node(array[0]);

  const half = Math.floor(array.length / 2);
  const middle = array[half];
  let leftArray = array.slice(0, half);
  let rightArray = array.slice(half + 1);

  const root = Node(middle);
  root.left = buildTree(leftArray);
  root.right = buildTree(rightArray);

  return root;
};

const Tree = function (rawArray) {
  //sort and remove duplicates
  const workingArray = removeDuplicates(mergeSort(rawArray));

  const root = buildTree(workingArray);

  const insert = function (value, currentNode = this.root) {
    value = Number(value);

    if (currentNode === null) {
      return Node(value);
    }
    if (currentNode.value === value) {
      return "Duplicate values not allowed";
    }
    if (currentNode.value > value) {
      currentNode.left = insert(value, currentNode.left);
    }
    if (currentNode.value < value) {
      currentNode.right = insert(value, currentNode.right);
    }
    return currentNode;
  };

  const deleteNode = function (
    value,
    currentNode = this.root,
    parent,
    childDirection,
  ) {
    if (currentNode.value === null) {
      return;
    }

    if (
      currentNode.value === value &&
      currentNode.right === null &&
      currentNode.left === null &&
      this !== undefined
    ) {
      this.root = null;
    }
    if (currentNode.value === value) {
      if (currentNode.left === null && currentNode.right === null) {
        if (childDirection === "right") parent.right = null;
        if (childDirection === "left") parent.left = null;
      } else if (currentNode.left !== null && currentNode.right === null) {
        if (childDirection === "right") parent.right = currentNode.left;
        if (childDirection === "left") parent.left = currentNode.left;
      } else if (currentNode.left === null && currentNode.right !== null) {
        if (childDirection === "right") parent.right = currentNode.right;
        if (childDirection === "left") parent.left = currentNode.right;
      } else if (currentNode.left !== null && currentNode.right !== null) {
        let Subnode = currentNode.right;
        parent = currentNode;
        while (Subnode.left !== null) {
          parent = Subnode;
          Subnode = Subnode.left;
        }
        currentNode.value = Subnode.value;

        deleteNode(Subnode.value, Subnode, parent, "left");
      }
    } else if (currentNode.value > value) {
      deleteNode(value, currentNode.left, currentNode, "left");
    } else if (currentNode.value < value) {
      deleteNode(value, currentNode.right, currentNode, "right");
    }
  };

  const find = function (value, currentNode = this.root) {
    if (currentNode === null) {
      return null;
    }
    if (currentNode.value === value) {
      return currentNode;
    }
    if (currentNode.value > value) {
      return find(value, currentNode.left);
    }
    if (currentNode.value < value) {
      return find(value, currentNode.right);
    }
  };

  const levelOrder = function (
    callback,
    stack = [this.root],
    arrayToReturn = [],
  ) {
    if (stack.length === 0) {
      if (callback === undefined) {
        return arrayToReturn;
      } else {
        return;
      }
    }
    if (stack[0].left !== null) {
      stack.push(stack[0].left);
    }
    if (stack[0].right !== null) {
      stack.push(stack[0].right);
    }

    if (callback === undefined) {
      arrayToReturn.push(stack[0].value);
    } else {
      callback(stack[0]);
    }
    stack.shift();
    return levelOrder(callback, stack, arrayToReturn);
  };

  const inorder = function (
    callback,
    currentNode = this.root,
    arrayToPrint = [],
  ) {
    if (currentNode === null) return;

    inorder(callback, currentNode.left, arrayToPrint);
    if (callback === undefined) {
      arrayToPrint.push(currentNode.value);
    } else {
      callback(currentNode);
    }
    inorder(callback, currentNode.right, arrayToPrint);

    return arrayToPrint;
  };
  const preorder = function (
    callback,
    currentNode = this.root,
    arrayToPrint = [],
  ) {
    if (currentNode === null) return;

    if (callback === undefined) {
      arrayToPrint.push(currentNode.value);
    } else {
      callback(currentNode);
    }
    preorder(callback, currentNode.left, arrayToPrint);
    preorder(callback, currentNode.right, arrayToPrint);

    return arrayToPrint;
  };
  const postOrder = function (
    callback,
    currentNode = this.root,
    arrayToPrint = [],
  ) {
    if (currentNode === null) return;

    postOrder(callback, currentNode.left, arrayToPrint);
    postOrder(callback, currentNode.right, arrayToPrint);
    if (callback === undefined) {
      arrayToPrint.push(currentNode.value);
    } else {
      callback(currentNode);
    }

    return arrayToPrint;
  };

  const findHeight = function (currentNode = this.root) {
    if (currentNode === null) {
      return -1;
    }
    const leftHeight = findHeight(currentNode.left);
    const rightHeight = findHeight(currentNode.right);

    return Math.max(leftHeight, rightHeight) + 1;
  };

  const findDepth = function (nodeToFind, currentNode = this.root, depth = 0) {
    if (currentNode === null) {
      return;
    }
    if (nodeToFind === currentNode) {
      return depth;
    }
    const leftPath = findDepth(nodeToFind, currentNode.left, depth + 1);
    const rightPath = findDepth(nodeToFind, currentNode.right, depth + 1);

    if (leftPath) {
      return leftPath;
    }
    if (rightPath) {
      return rightPath;
    }
  };

  const isBalanced = function (
    currentNode = this.root,
    maxHeight = findHeight(currentNode),
  ) {
    if (currentNode === null) {
      return -1;
    }
    const leftPath = isBalanced(currentNode.left, maxHeight);
    const rightPath = isBalanced(currentNode.right, maxHeight);

    if (getDifference(leftPath, rightPath) <= 1) {
      const currentNodeHight = findHeight(currentNode);
      if (currentNodeHight === maxHeight) {
        return true;
      }
      return currentNodeHight;
    }

    return false;
  };

  const rebalance = function () {
    const disbalancedTree = binaryTree.levelOrder();

    const balancedTree = Tree(disbalancedTree);
    this.root = balancedTree.root;
  };

  return {
    root,
    insert,
    deleteNode,
    find,
    levelOrder,
    inorder,
    preorder,
    postOrder,
    findHeight,
    findDepth,
    isBalanced,
    rebalance,
  };
};
const binaryTree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(binaryTree.isBalanced());
console.log(binaryTree.levelOrder());
console.log(binaryTree.preorder());
console.log(binaryTree.postOrder());
console.log(binaryTree.inorder());
binaryTree.insert(102);
binaryTree.insert(103);
console.log(binaryTree.isBalanced());
binaryTree.rebalance();
console.log(binaryTree.isBalanced());
console.log(binaryTree.levelOrder());
console.log(binaryTree.preorder());
console.log(binaryTree.postOrder());
console.log(binaryTree.inorder());
