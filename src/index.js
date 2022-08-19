import { removeDuplicates, mergeSort } from "./util.js";

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
  console.log(workingArray);

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
        console.log("has both");
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

  return { root, insert, deleteNode };
};
const binaryTree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(binaryTree.root);

binaryTree.deleteNode(8);
console.log("-------------------------");
console.log(binaryTree.root);

console.dir(JSON.stringify(binaryTree.root));
JSON.stringify(binaryTree.root);
