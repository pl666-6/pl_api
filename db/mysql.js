const {
    pool
} = require('./pool')
/*
let find = (handel) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        const sql = 'select * from user_copy '
        connection.query(sql, [], (err, result) => {
            if (err) throw err
            handel(result)

            //释放对象到连接池
            connection.release()
        })
    })
}
let add = (handel, obj) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        let sql = 'insert into user_copy (description,money,type) values(?,?,?)'
        connection.query(sql, [obj.description, obj.money, obj.type], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}
*/
//通知
//查询所有通知
let News = (handel) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        const sql = 'SELECT * from NEWS order by id desc'
        connection.query(sql, [], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}
//根据内容查询
let NewsBycontent = (handel, content) => {
    pool.getConnection((err, connection) => {
        console.log(content)
        if (err) throw err
        const sql = 'SELECT * from NEWS WHERE news LIKE  "%' + content + '%" order by id desc'
        connection.query(sql, [], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}
//新增通知、修改通知
let saveOreditNew = (handel, obj) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        var createdTime = new Date()
        console.log(createdTime)
        if (obj.id) {
            const sql = 'UPDATE NEWS SET news = ?,author = ?,created = ?  WHERE id = ?'
            connection.query(sql, [obj.news, obj.author, obj.created, obj.id], (err, result) => {
                if (err) throw err
                handel(result)
                connection.release()
            })
        } else {
            const sql = 'INSERT INTO NEWS(news,author,created) VALUES(?,?,?)'
            connection.query(sql, [obj.news, obj.author, createdTime], (err, result) => {
                if (err) throw err
                handel(result)
                connection.release()
            })
        }
    })
}

//删除通知
let delNews = (handel, id) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        const sql = 'DELETE from NEWS WHERE id = ?'
        connection.query(sql, [id], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}


//用户模块
//查找所有用户
let findUser = (handel) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        const sql = 'select * from user_copy'
        connection.query(sql, [], (err, result) => {
            if (err) throw err
            handel(result)

            //释放对象到连接池
            connection.release()
        })
    })
}
//通过名字查询
let findByName = (handel, data) => {
    pool.getConnection((err, connection) => {
        if (err) throw err

        const sql = "SELECT * FROM user_copy WHERE realname LIKE '%" + data.name + "%'"
        connection.query(sql, [], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}
//查找准确名字
let findByNames = (handel, data) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        const sql = 'SELECT * from user_copy WHERE realname = ?'
        connection.query(sql, [data.name], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}
//新增或者修改用户
let saveOredit = (handel, obj) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        else if (obj.id) {
            console.log(obj.id)
            const sql = "UPDATE user_copy SET username=?,password=?,birthday=?,school=?,major=?,realname=?,Expected_location=?,age=?,sex=?,phone=? WHERE id = ?"
            connection.query(sql, [obj.username, obj.password, obj.birthday, obj.school, obj.major, obj.realname, obj.Expected_location, obj.age, obj.sex, obj.phone, obj.id], (err, result) => {
                if (err) throw err
                handel('修改成功')
                connection.release()
            })
        } else {
            /*
                    if (obj.username) {
            handel('该用户名已被注册')
        } 
            */
            var sql = 'SELECT username from user_copy WHERE username = ?'
            connection.query(sql, [obj.username], (err, result) => {
                console.log(result.length)
                if (result.length !== 0) {
                    handel('该用户名已被注册')
                } else {
                    const sql = "INSERT INTO user_copy (username,password,birthday,school,major,realname,Expected_location,age,sex,phone) VALUES(?,?,?,?,?,?,?,?,?,?)"
                    connection.query(sql, [obj.username, obj.password, obj.birthday, obj.school, obj.major, obj.realname, obj.Expected_location, obj.age, obj.sex, obj.phone], (err, result) => {
                        if (err) throw err
                        handel('注册成功')
                        connection.release()
                    })
                }
            })

        }
    })
}
//删除用户
let del = (handel, id) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        let sql = 'DELETE FROM user_copy WHERE id=?'
        connection.query(sql, [id], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}
//登录
let login = (handel, obj) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        var Res_Data = {
            code: 0,
            info: 0
        }
        const sql = "SELECT *FROM user_copy WHERE username =?"
        connection.query(sql, [obj.username], (err, result) => {
            console.log(result)
            console.log(obj)
            console.log(obj.username)
            console.log(obj.password)
            if (result[0]) {

                if (result[0].password == obj.password) {
                    Res_Data.code = 0
                    Res_Data.info = result
                    handel(Res_Data)
                } else {
                    Res_Data.code = 1
                    Res_Data.info = '密码错误'
                    handel(Res_Data)
                }
            } else {
                Res_Data.code = 2
                Res_Data.info = '用户不存在'
                handel(Res_Data)

            }
            connection.release()
        })
    })
}
//企业模块
//查询所有企业
let findAllCompany = (handel) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        const sql = 'SELECT * from company_copy '
        connection.query(sql, [], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}
//新增或者修改企业信息
let saveOreditCompany = (handel, obj) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        if (obj.id) {
            const sql = 'UPDATE company_copy set company_name=?,gangwei_name=?,gangwei_id=?,money=?,zhuangye=?,phone=?,address=?,scale=?,hangye=?,reqiuire=?,introduction=?,end_time=? WHERE id = ?'
            connection.query(sql, [obj.company_name, obj.gangwei_name, obj.gangwei_id, obj.money, obj.zhuangye, obj.phone, obj.address, obj.scale, obj.hangye, obj.reqiuire, obj.introduction, obj.end_time, obj.id], (err, result) => {
                if (err) throw err
                handel(result)
                connection.release()
            })
        } else {
            const sql = 'INSERT INTO company_copy(company_name,gangwei_id,address,phone,scale,introduction,hangye,gangwei_name,money,reqiuire,zhuangye,start_time,end_time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)'
            var data = new Date()
            connection.query(sql, [obj.company_name, obj.gangwei_id, obj.address, obj.phone, obj.scale, obj.introduction, obj.hangye, obj.gangwei_name, obj.money, obj.reqiuire, obj.zhuangye, data, obj.end_time], (err, result) => {
                if (err) throw err
                handel(result)
                connection.release()
            })
        }
    })
}
//删除
let delCompanyInfo = (handel, id) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        const sql = 'DELETE FROM company_copy WHERE id = ?'
        connection.query(sql, [id], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}
//按名字搜索
let searchCompanyByname = (handel, name) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        const sql = "SELECT * from company_copy WHERE company_name LIKE '%" + name + "%'"
        connection.query(sql, [], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}
let searchCompanyBynames = (handel, name) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        const sql = "SELECT * from company_copy WHERE company_name=?"
        connection.query(sql, [name], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}
//通过id查询具体的岗位
let searchCompangById = (handel, id) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        let sql = 'SELECT * from company_copy WHERE id = ?'
        connection.query(sql, [id], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}
//投递信息
//查询所有投递信息
let findAllDelivery = (handel) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        // c_u.id用户的id ct.p_id连接表种对应用户id，cp.id岗位信息的id,ct.c_id连接表对应岗位信息表id
        let sql = 'SELECT * from contact ct LEFT JOIN user_copy  u_c on u_c.id=ct.p_id LEFT JOIN company_copy cp on cp.id = ct.c_id  '
        connection.query(sql, [], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}
//根据名字查询投递信息
let findAllDeliveryByid = (handel, id) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        let sql = 'SELECT * from contact ct LEFT JOIN user_copy  u_c on u_c.id=ct.p_id LEFT JOIN company_copy cp on cp.id = ct.c_id WHERE ct.p_id = ?'
        connection.query(sql, [id], (err, result) => {
            handel(result)
            connection.release()
        })
    })
}
//删除投递信息通过id
let delDeliveryByid = (handel, obj) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        const sql = 'DELETE FROM contact WHERE p_id = ? AND c_id = ?'
        connection.query(sql, [obj.p_id, obj.c_id], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}
//新增投递信息
let addDelivery = (handel, obj) => {
    pool.getConnection((err, connection) => {
        console.log(obj)
        if (err) throw err
        const s1 = 'SELECT * from contact WHERE p_id= ? and c_id =?'
        connection.query(s1, [obj.p_id, obj.c_id], (err, result) => {
            console.log(result)
            if (result.length == 0) {
                var time = new Date()
                const sql = 'INSERT INTO contact(p_id,c_id,time) VALUES (?,?,?)'
                connection.query(sql, [obj.p_id, obj.c_id, time], (err, result) => {
                    if (err) throw err
                    handel('投递成功')
                    connection.release()
                })
            } else {
                handel('你已经投递过此岗位了')
            }
        })
        /*   const sql = 'INSERT INTO contact(p_id,c_id) VALUES (?,?)'
           connection.query(sql,[obj.p_id,obj.c_id],(err,result)=>{
               if(err) throw err
               handel(result)
               connection.release()
           })*/
    })
}
//查询新增投递的时间
let addDeliveryTime = (handel) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        const sql = 'SELECT * FROM contact '
        connection.query(sql, [], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}
//通过id查询投递时间
let addDeliveryTimeById = (handel, id) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        const sql = 'SELECT * FROM contact where p_id = ? '
        connection.query(sql, [id], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}
//更新招聘状态
let updateState = (handel, obj) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        const sql = 'UPDATE contact set ispass = ? WHERE p_id=? and c_id = ?'
        connection.query(sql, [obj.ispass, obj.p_id, obj.c_id], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}
// 管理员登录
let admin = (handel, obj) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        const sql = 'SELECT * from Administration WHERE user =?'
        connection.query(sql, [obj.user], (err, result) => {
            if (err) throw err
            let data = {}
            if (result[0]) {
                if (obj.password == result[0].password) {
                    data.code = 1
                    data.content = '登录成功'
                    handel(data)
                } else {
                    data.code = 2
                    data.content = '密码错误'
                    handel(data)
                }
            } else{
                data.code = 3
                data.content = '用户不存在'
                handel(data)
            }
        })
    })
}
//查询学院与专业
let findXueYuan = (handel) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        const sql = 'SELECT * FROM xueyuan'
        connection.query(sql, [], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}

let finZhuanYe = (handel, id) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        const sql = 'SELECT * FROM zhuanye WHERE p_name = ?'
        connection.query(sql, [id], (err, result) => {
            if (err) throw err
            handel(result)
            connection.release()
        })
    })
}
module.exports = {

    News, //查询通知
    saveOreditNew, //新增或者修改
    delNews, //删除通知
    NewsBycontent,
    /*  find,
      add,*/
    //用户模块
    findUser, //查找所有用户
    saveOredit, //新增或者删除用户
    del, //删除用户
    findByName, //通过名字查询
    findByNames, //查找准确名字
    login, //登录
    //企业模块
    findAllCompany, //查询所有企业
    saveOreditCompany, //保存或者修改
    delCompanyInfo, //删除招聘信息
    searchCompanyByname, //通过名字搜索公司
    searchCompanyBynames,
    searchCompangById, //通过id查询具体的岗位

    //投递信息
    findAllDelivery, //查询所有投递信息
    findAllDeliveryByid, //根据名字查询投递信息
    delDeliveryByid, //删除投递信息通过id
    addDelivery, //新增投递
    addDeliveryTime, //查询投递时间
    addDeliveryTimeById, //通过id查询投递时间
    updateState, //更新招聘状态
    //查询学院与专业
    findXueYuan,
    finZhuanYe,
    admin
}