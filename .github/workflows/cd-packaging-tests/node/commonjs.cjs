const { random } = require("@inrupt/jose-legacy-modules");

console.log(random(Buffer.from([42])));
