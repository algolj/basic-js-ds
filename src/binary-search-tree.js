const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
module.exports = class BinarySearchTree {
  _tree = null;
  root() {
    return this._tree;
  }

  add(data, tree = this._tree) {
    if (tree == null) {
      this._tree = new Node(data);
    } else {
      if (tree.data > data) {
        if (tree.left == null) {
          tree.left = new Node(data);
        } else {
          this.add(data, tree.left);
        }
      } else {
        if (tree.right == null) {
          tree.right = new Node(data);
        } else {
          this.add(data, tree.right);
        }
      }
    }
  }

  has(data, tree = this._tree) {
    return data == tree.data
      ? true
      : data > tree.data
      ? tree.right == null
        ? false
        : this.has(data, tree.right)
      : tree.left == null
      ? false
      : this.has(data, tree.left);
  }

  find(data, tree = this._tree) {
    return data == tree.data
      ? tree
      : data > tree.data
      ? tree.right == null
        ? null
        : this.find(data, tree.right)
      : tree.left == null
      ? null
      : this.find(data, tree.left);
  }

  remove(data) {
    const removeNode = (data, tree = this._tree) => {
      if (tree == null) return null;
      if (data == tree.data) {
        if (tree.left == null || tree.right == null) {
          tree = tree.left || tree.right;
        } else {
          const pereves = (node = tree.right) =>
            node.left == null ? (node.left = tree.left) : pereves(node.left);
          pereves();
          tree = tree.right;
        }
        return tree;
      } else {
        tree[data > tree.data ? 'right' : 'left'] = removeNode(
          data,
          tree[data > tree.data ? 'right' : 'left']
        );
        return tree;
      }
    };
    this._tree = removeNode(data);
  }

  min(tree = this._tree) {
    return tree == null
      ? null
      : tree.left != null
      ? this.min(tree.left)
      : tree.data;
  }

  max(tree = this._tree) {
    return tree == null
      ? null
      : tree.right != null
      ? this.max(tree.right)
      : tree.data;
  }
};
