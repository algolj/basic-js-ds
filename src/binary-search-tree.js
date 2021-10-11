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

  has(data, type = 'has', tree = this._tree) {
    return data == tree.data
      ? type == 'has'
        ? true
        : tree
      : tree[data > tree.data ? 'right' : 'left'] == null
      ? type == 'has'
        ? false
        : null
      : this.has(data, type, tree[data > tree.data ? 'right' : 'left']);
  }

  find = (data) => this.has(data, 'find', this._tree);

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

  min(tree = this._tree, node = 'left') {
    return tree == null
      ? null
      : tree[node] != null
      ? this.min(tree[node], node)
      : tree.data;
  }

  max = () => this.min(this._tree, 'right');
};
