const express=require('express');
const path=require('path');
const bodyparser=require('body-parser')
const session=require('express-session');
const {v4:uuidv4}=require('uuid')
const router=require('./router')
const app=express();
const nocache=require('nocache')
const port=process.env.port || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(nocache())
app.set('view engine','ejs')

//load static assets

app.use(express.static(path.join(__dirname,'public')))


app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))

app.use('/route',router)
//Home Route

app.get('/',(req,res) => {
    if(req.session.user){
        res.redirect('/route/home')
    }else{
    res.render('base',{
        title:"Login System"
    })
}
    })




app.listen(port,()=>{
    console.log("server started!!!")
})