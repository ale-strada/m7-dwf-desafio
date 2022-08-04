const algoliasearch = require("algoliasearch");

const client = algoliasearch(process.env.ALGOLIA_USER, process.env.ALGOLIA_KEY);
const index = client.initIndex("pets");

export { index };
