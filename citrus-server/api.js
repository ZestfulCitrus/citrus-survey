const connectToMongoDB = require('./mongodb');

async function run() {
  try {
    // 连接到 MongoDB
    const db = await connectToMongoDB();

    // 在这里可以执行数据库操作
    // 例如插入、查询、更新等

    // 关闭数据库连接
    await db.close();

    console.log('MongoDB connection closed.');
  } catch (error) {
    console.error('Error:', error);
  }
}

run();