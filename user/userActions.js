const UserDb = require("../db/UserDb");
const NodesDb = require("../db/NodesDb");
const Mqtt = require("../mqtt/mqtt");

const nodesDb = new NodesDb();

module.exports = userActions = {
  getPreferences(userId) {
    return new Promise((resolve, reject) => {
      UserDb.findByUserId(userId)

        .then(user => resolve(user.preferences))
        .catch(err => reject(err));
    });
  },

  establishMqttRelay(cloudHost, cloudPort) {
    return new Promise((resolve, reject) => {
      Mqtt.establishMessageRelay(cloudHost, cloudPort).then(res =>
        resolve(res)
      );
    });
  },

  addOrUpdateHandle(user_id, name, handle) {
    return new Promise((resolve, reject) => {
      UserDb.findByUserId(user_id)
        .then(user => {
          nodesDb
            .findByName(name)
            .then(node => {
              const { nodes } = user.preferences;
              this.newHandle = {
                node: node._id.toString(),
                handle
              };
              // check to avoid exact duplicate
              if (
                nodes.find(
                  iterate =>
                    iterate.node._id.toString() === node._id.toString() &&
                    iterate.handle === handle
                )
              )
                reject({ errors: "Handel must be new" });
              // check to avoid duplicate nodes with defferent handles
              // check to avoid duplicate handle for defferent nodes
              else if (nodes.find(iterate => iterate.handle === handle))
                reject({
                  errors: "you have a node withe this handle"
                });
              // create unique handle for unique node
              else if (
                nodes.find(
                  iterate =>
                    iterate.node._id.toString() === node._id.toString() &&
                    iterate.handle !== handle
                )
              )
                // update a node handle
                nodes[
                  nodes
                    .map(iterate => iterate.node._id.toString())
                    .indexOf(node._id.toString())
                ].handle = handle;
              else nodes.addToSet(this.newHandle);
              // save the changes
              user
                .save()
                .then(user => {
                  resolve(user);
                })
                .catch(err => reject(err));
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
};
