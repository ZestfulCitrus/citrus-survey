const serverPort = process.env.CITRUS_SERVER_PORT;
module.exports={
    // 服务器端口号
    serverPort: serverPort || 3000,
    mongoUri: "mongodb://124.223.53.154:27017",
    dbName: 'citrus'
}