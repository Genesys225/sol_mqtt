const telemetryActions = require("./telemetryActions");

const mdns = require("../mdns/mdns");
const NodesDb = require("../db/NodesDb");

const query = new mdns();
const nodesDb = new NodesDb();

const nodesActions = {
  registeredList: {},
  register(NodeObject) {
    return new Promise((resolve, reject) => {
      const errors = {};
      // Check Validation
      //   if (!isValid) {
      //     return res.status(400).json(errors);
      //   }
      // Check if node previusely registered
      nodesDb
        .findByName(NodeObject.name)
        .then(() => {
          // found means registered no need to register!
          reject((errors.name = "Node already exists"));
        })
        // reject from findByName means unregistered, let's register
        .catch(() =>
          // Registe new node
          nodesDb
            .createNodeDoc(NodeObject)
            .then(newNode => {
              this.updateRegistered();
              resolve(newNode);
            })
            .catch(err =>
              reject((errors.format = "must be in correct format"), err)
            )
        );
    });
  },

  updateRegistered() {
    this.getRegistered().then(nodesList => {
      this.registeredList = nodesList;
    });
  },

  getRegistered() {
    return new Promise((resolve, reject) => {
      nodesDb
        .listAllRegistered()
        .then(nodesList => {
          telemetryActions.setRegisteredList(nodesList);
          resolve(nodesList);
        })
        .catch(err => reject(err));
    });
  },

  getUnregistered() {
    return new Promise((resolve, reject) => {
      query.scan("esp").then(nodes => {
        // Compare scan results with registered list
        let registeredNamesArray = Object.keys(this.registeredList);
        let newNodes = nodes.filter(
          node => registeredNamesArray.indexOf(node.name) < 0
        );
        // Only return unregistered
        resolve(newNodes);
      });
    });
  },

  getAllInRange() {
    return new Promise((resolve, reject) => {
      query.scan("esp").then(nodes => {
        resolve(nodes);
      });
    });
  },

  unregister(nodeName) {
    return new Promise((resolve, reject) => {
      nodesDb
        .findByNameAndDelete(nodeName)
        .then(res => {
          this.updateRegistered();
          resolve(res);
        })
        .catch(err => reject(err));
    });
  }
};

module.exports = nodesActions;
