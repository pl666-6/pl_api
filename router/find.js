var express = require("express")
var datas = require("../db/mysql")

var customer = express.Router()
/*
customer.get('/find', (req, res) => {
    datas.find(result => {
        res.send(result)
    })
})

customer.get('/save', (req, res) => {
    datas.add((result) => {
        res.send(result)
    }, req.query)
})

*/

//通知
//查找所有通知
customer.get('/News', (req, res) => {
    datas.News(result => {
        res.send(result)
    })
})
//新增或者修改通知
customer.post('/saveOreditNew', (req, res) => {
    datas.saveOreditNew(result => {
        res.send(result)
    }, req.body)
})
//删除通知
customer.get('/delNews', (req, res) => {
    datas.delNews(result => {
        res.send(result)
    }, req.query.id)
})
//通过名字查询通知
customer.get('/NewsBycontent', (req, res) => {
    datas.NewsBycontent(result => {
        res.send(result)
    }, req.query.content)
})
//用户模块
//查找所有用户
customer.get('/findUser', (req, res) => {
    datas.findUser(result => {
        res.send(result)
    })
})
//通过名字查询
customer.get('/findByName', (req, res) => {
    console.log(req.query)
    datas.findByName(result => {
        res.send(result)
    }, req.query)
})
//查找准确名字
customer.get('/findByNames', (req, res) => {
    console.log(req.query)
    datas.findByNames(result => {
        res.send(result)
    }, req.query)
})
//新增用户
customer.post('/saveOredit', (req, res) => {
    console.log(req.body)
    datas.saveOredit((result) => {
        res.send(result)
    }, req.body)
})
//删除用户
customer.get('/del', (req, res) => {
    datas.del((result) => {
        res.send('删除成功')
    }, req.query.id)
})
//登录
customer.post('/login', (req, res) => {
    datas.login((result) => {
        res.send(result)
    }, req.body)
})

//企业模块
//查询所有企业
customer.get('/findAllCompany', (req, res) => {
    datas.findAllCompany((result) => {
        res.send(result)
    })
})
//保存或者修改
customer.post('/saveOreditCompany', (req, res) => {
    console.log(req.body)
    datas.saveOreditCompany((result) => {
        res.send('成功')
    }, req.body)
})
//删除招聘信息
customer.get('/delCompanyInfo', (req, res) => {
    datas.delCompanyInfo((result) => {
        res.send('操作成功')
    }, req.query.id)
})
//通过名字搜索公司
customer.get('/searchCompanyByname', (req, res) => {
    datas.searchCompanyByname((result) => {
        res.send(result)
    }, req.query.name)
})
customer.get('/searchCompanyBynames', (req, res) => {
    datas.searchCompanyBynames((result) => {
        res.send(result)
    }, req.query.name)
})
//通过id查询具体的岗位
customer.get('/searchCompangById', (req, res) => {
    datas.searchCompangById((result) => {
        res.send(result)

    }, req.query.id)
})

//投递信息模块
//查询所有投递情况
customer.get('/findAllDelivery', (req, res) => {
    datas.findAllDelivery((result) => {
        res.send(result)
    })
})
//根据名字查询投递信息
customer.get("/findAllDeliveryByid", (req, res) => {
    datas.findAllDeliveryByid((result) => {
        res.send(result)
    }, req.query.id)
})

//删除投递信息通过id
customer.get("/delDeliveryByid", (req, res) => {
    console.log(req.query)
    datas.delDeliveryByid((result) => {
        res.send(result)
    }, req.query)
})
//新增投递信息
customer.get("/addDelivery", (req, res) => {
    datas.addDelivery((result) => {
        res.send(result)
    }, req.query)
})
//查询投递时间
customer.get("/addDeliveryTime", (req, res) => {
    datas.addDeliveryTime((result) => {
        res.send(result)
    })
})
//查询投递时间通过id
customer.get("/addDeliveryTimeById", (req, res) => {
    datas.addDeliveryTimeById((result) => {
        res.send(result)
    }, req.query.id)
})
//更新招聘状态
customer.post("/updateState",(req,res)=>{
    console.log(req.body)
    datas.updateState(result=>{
        res.send(result)
    },req.body)
})

// 管理员登录
customer.post('/admin',(req,res) => {
    datas.admin(result => {
        res.send(result)
    },req.body)
})

//查询学院与专业

customer.get("/findXueYuan", (req, res) => {
    datas.findXueYuan((result) => {
        res.send(result)
    })
})
customer.get("/finZhuanYe", (req, res) => {
    datas.finZhuanYe((result) => {
        res.send(result)
    }, req.query.id)
})
module.exports = customer