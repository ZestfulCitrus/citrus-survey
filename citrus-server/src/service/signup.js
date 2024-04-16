const {sha256} = require('../utils/hash.js')
async function SignUp(req, res) {
  try {
    const accountsCollection = global.db.collection("accounts");
    // 创建唯一索引
    accountsCollection.createIndex({ username: 1 }, { unique: true ,sparse: true});
    let data = req.body;
    // 创建要插入的用户对象
    const user = {
      username: data.username,
      nickName: data.nickName,
      email: data.email,
      password: sha256("password123"),
    };
    // 插入用户
    const insertResult = await accountsCollection.insertOne(user);
    res.send({
      code: 20000,
      msg: "User inserted!",
      data: insertResult,
    });
  } catch (error) {
    if (error.errorResponse?.code == 11000) {
      res.send({
        code: 50000,
        msg: "用户名重复！请重新输入！",
      });
    } else {
      console.error("Error:", error);
      res.send({
        code: 50000,
        msg: error,
      });
    }
  }
}
module.exports = {
  SignUp,
};
