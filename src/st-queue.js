const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
module.exports = class Queue {
  _list = null;

  getUnderlyingList = () => this._list;

  enqueue(value) {
    if (!value) return;
    if (this._list == null) {
      this._list = new ListNode(value);
    } else {
      const addValueQueue = (cur = this._list) =>
        cur.next == null
          ? (cur.next = new ListNode(value))
          : addValueQueue(cur.next);

      addValueQueue();
    }
  }

  dequeue() {
    if (!this._list) return null;
    const value = this._list.value;
    this._list = this._list.next;
    return value;
  }
};
