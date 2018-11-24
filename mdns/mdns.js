const bonjour = require("bonjour")();
class mdns {
  scan(type) {
    let services = [];
    return new Promise((resolve, reject) => {
      // browse for all nodes
      bonjour.find({ type: type }, newService => {
        const { addresses, txt, name, host, port } = newService;
        if (services.filter(service => service.name === name).length < 1) {
          services.push({
            name: name,
            host: host,
            ip: addresses[0],
            port: port,
            capabilities: txt.capabilities,
            firmwareVersion: txt.firmware_version
          });
          resetTimer();
        }
        //console.log("Found an HTTP server:", services);
      });

      // wait for new mdns up events
      var scanWait = setTimeout(() => {
        services ? resolve(services) : reject({ errors: "No services Found" });
      }, 500);

      // rese wait timer in case of new result ^
      function resetTimer() {
        clearTimeout(scanWait);
        scanWait = setTimeout(() => {
          resolve(services);
        }, 500);
      }
    });
  }
}
module.exports = mdns;
