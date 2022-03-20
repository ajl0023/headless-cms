module.exports = () => {
  const uri =
    "mongodb+srv://a:a@cluster0.2e6a1.mongodb.net/maliview?retryWrites=true&w=majority";
  const { MongoClient } = require("mongodb");
  const client = new MongoClient(uri);

  async function run() {
    try {
      
      // Connect the client to the server
      // await client.connect();
      // // Establish and verify connection
      // await client.db("admin").command({ ping: 1 });

      // require("./server")(database);
    } finally {
      // Ensures that the client will close when you finish/error
    }
  }
  return client;
};
