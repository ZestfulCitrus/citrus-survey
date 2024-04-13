import express from 'express'
import bodyParser  from 'body-parser'
const app = express()
const port = 3000
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/survey/:id', (req, res) => {
  const sId = req.params.id; // 获取路由参数
  if (sId)
    res.send({
      sid: sId,
      meta: {

      },
      surveyContent: {
        title: '消费者购物偏好调查',
        desc: '亲爱的参与者，感谢您抽出时间来参与我们的调查。本调查旨在了解消费者的购物偏好和行为习惯，以便我们改进和提供更好的产品和服务。请您根据您的实际情况回答以下问题。您的个人信息将被严格保密，仅用于研究目的。感谢您的参与！',
        question: [
          {
            qid: 'adlkfji',
            type: "checkbox",
            data: {
              surveyTitle: "请问您的性别是：",
              options: [{ value: '男' }, { value: '女' }],
              answer: {}
            }
          },
          {
            qid: 'adlkfji1',
            type: "checkbox",
            data: {
              surveyTitle: '您通常在哪些渠道购买商品？（可选择多个选项）',
              options: [{ value: '商场' }, { value: '酒店' }],
              answer: {}
            }
          }
        ],
        footer: {
          desc: '问卷到此结束感谢您的参与',
          button: '提交'
        }
      }
    })
  else {
    res.send({
      code: 401
    })
  }
})
app.post('/survey/:id', (req, res) => {
  res.send(req.body)
})
app.use('/static', express.static('./static'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})