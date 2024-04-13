const { connectToMongoDB } = require("./db");

async function run() {
  try {
    // 连接到 MongoDB
    const { client, db } = await connectToMongoDB();
    try {
      const accountsCollection = db.collection("accounts");
      // 创建唯一索引
      accountsCollection.createIndex({ username: 1 }, { unique: true });
      // 创建要插入的用户对象
      const user = {
        username: "john2",
        nickName: "default",
        email: "john@example.com",
        password: "password123",
      };
      // 插入用户
      const insertResult = await accountsCollection.insertOne(user);
      console.log("User inserted:", insertResult.insertedId);
    } catch (error) {
        if(error.errorResponse.code == 11000){
            console.error("用户名重复！请重新输入！");
        }
        else{
            console.error("Error:", err);
        }
    } finally {
      await client.close();
      console.log("MongoDB connection closed.");
    }
  } catch (error) {
    console.error("Error:", err);
  }
}

run();
