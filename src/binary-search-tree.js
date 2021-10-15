const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
module.exports = class BinarySearchTree {
  _tree = null;
  root = () => this._tree;

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

  has = (data) => this.find(data) != null;

  find(data, tree = this._tree) {
    return data == tree.data
      ? tree
      : tree[data > tree.data ? 'right' : 'left'] == null
      ? null
      : this.find(data, tree[data > tree.data ? 'right' : 'left']);
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
      } else {
        tree[data > tree.data ? 'right' : 'left'] = removeNode(
          data,
          tree[data > tree.data ? 'right' : 'left']
        );
      }
      return tree;
    };
    this._tree = removeNode(data);
  }

  min(node = 'left', tree = this._tree) {
    return tree == null
      ? null
      : tree[node] != null
      ? this.min(node, tree[node])
      : tree.data;
  }

  max = () => this.min('right', this._tree);
};
