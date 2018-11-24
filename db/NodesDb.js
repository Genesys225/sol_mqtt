const Node = require("../models/Node");

class NodesDb {
  constructor() {
    this.errors = {};
  }

  listAllRegistered() {
    return new Promise((resolve, reject) => {
      Node.find({}, (err, nodes) => {
        let nodeList = {};
        nodes.forEach(node => (nodeList[node.name] = node));
        nodeList ? resolve(nodeList) : reject({ errors: "No nodes in db" });
      });
    });
  }

  findByName(nodeName) {
    return new Promise((resolve, reject) => {
      Node.findOne({ name: nodeName }).then(foundNode => {
        this.errors.name = "Node not found";
        foundNode ? resolve(foundNode) : reject(this.errors);
      });
    });
  }

  findByNameAndDelete(nodeName) {
    return new Promise((resolve, reject) => {
      Node.findOneAndDelete({ name: nodeName }).then(bool => {
        this.errors.name = "Node not found";
        bool ? resolve({ success: true }) : reject(this.errors);
      });
    });
  }

  createNodeDoc(nodeObect) {
    return new Promise((resolve, reject) => {
      const newNode = new Node({
        name: nodeObect.name,
        host: nodeObect.host,
        capabilities: nodeObect.capabilities.split(","),
        ip: nodeObect.ip,
        port: nodeObect.port,
        firmwareVersion: nodeObect.firmwareVersion
      });

      newNode
        .save()
        .then(createdNode => {
          resolve(createdNode);
        })
        .catch(err => reject(err));
    });
  }
}

module.exports = NodesDb;
