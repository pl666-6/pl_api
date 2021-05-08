const mysql = require('mysql')

const pool = mysql.createPool({
    host:'8.131.50.83',//pl
   // host:'106.15.75.122',//liu
    port:3306,
    user:'root',
    password:'root',
    database:'zhaopin',
})

module.exports = {
    pool
}