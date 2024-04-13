const { MongoClient } = require("mongodb");
async function connectToMongoDB() {
  const uri = "mongodb://124.223.53.154:27017"; // MongoDB 连接 URI
  const dbName = "citrus"; // 数据库名称

  try {
    // 创建 MongoDB 客户端
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // 连接到 MongoDB
    await client.connect();
    // 选择数据库
    const db = client.db(dbName);
    // 返回连接的数据库实例
    return { db , client };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

module.exports = {
  connectToMongoDB
}