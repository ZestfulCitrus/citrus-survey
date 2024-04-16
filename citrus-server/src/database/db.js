const { MongoClient } = require("mongodb");
const { mongoUri,dbName } = require('../config/option')
const ConnectSymbol= {
  IS_CONNECTED: 1,
  IS_NOT_CONNECTED:2,
  CONNECTING:3
}
const client = new MongoClient(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let connectState = ConnectSymbol.IS_NOT_CONNECTED;
async function connectToMongoDB() {
  try {
    connectState = ConnectSymbol.CONNECTING;
    await client.connect();
    let db = client.db(dbName);
    connectState = ConnectSymbol.IS_CONNECTED;
    // 返回连接的数据库实例
    return { db , client };
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    connectState = ConnectSymbol.IS_NOT_CONNECTED;
    throw err;
  }
}
async function disconnectToMongoDB(){
  try{
    await client.close();
    connectState = ConnectSymbol.IS_NOT_CONNECTED;
    console.log("MongoDB connection closed.");
  }catch(err){
    throw err;
  }
}

module.exports = {
  connectToMongoDB,
  disconnectToMongoDB,
}