var  express = require("express")
var customer = require("./router/find")
const bodyParser = require('body-parser')

//创建应用
let app = express()

//使用拦截器
app.use(bodyParser.urlencoded({extended:true}))
// 跨域 域名、协议、端口均为相同
app.all('*',(req,res,next)=>{
    /*res.set({
        "Access-Control_Allow":"*",
        "Content-Type":"text/plain;charset=utf-8"
        
    })*/

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");

    next()
})

app.use(customer)

app.listen(1234,()=>{
    console.log(666666666)
})