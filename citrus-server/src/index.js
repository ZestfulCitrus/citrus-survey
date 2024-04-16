const { server } = require('./http/server')
const { serverPort } = require('./config/option')
const { connectToMongoDB , disconnectToMongoDB} = require("./database/db")
server.listen(serverPort, async () => {
    const {db, client} = await connectToMongoDB();
    global.db = db
    global.client = client
    console.log(`Citrus server listening on http://127.0.0.1:${serverPort}`)
});
process.on('SIGINT', async () => {
    console.log('Server is shutting down...');
    // 在这里执行清理操作或其他必要的任务
    // ...
    // 关闭服务器
    await disconnectToMongoDB();
    console.log('Server closed.');
    process.exit(0); // 退出进程，0 表示正常退出
});