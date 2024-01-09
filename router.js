var express=require('express');
var router=express.Router()

const credential={
    email:"ashidha@gmail.com",
    password:"ashidha@123"
}

//login user
router.post('/login',(req,res)=>{
    if(req.body.email==credential.email && req.body.password==credential.password){
        req.session.user=req.body.email;
        req.session.validate=true
        res.redirect('/route/home')
       
    }else{
        res.render('base',{
            title:'Login system',
            message:'Invalid Email or Password!!!'
        })
    }
})



//route for home
var data=[
    {
        item:"Texas Style Chicken",
        description:"This shredded chicken Texas chili is rich and hearty, made with 8 simple ingredients! Just saucy chunks of tender chicken that shreds apart with the lightest pull of a fork. YUM.",
        button:"Read More..."
    },
    {
        item:"Pumpkin Muffins with Maple Cream Cheese  ",
        description:"Pumpkin muffins are getting a lightly crunchy, sparkly cinnamon sugar topping, and then stuffed to the brim with maple cream cheese whipped cream. YUM.",
        button:"Read More..."
    },
    {
        item:"5 ingredient Tomato Soup",
        description:"A simple 5 ingredient tomato soup made with butter, onion, and canned San Marzano tomatoes. Based on the Marcella Hazan tomato sauce recipe. This hits the cozy vibes just right.",
        button:"Read More..."
    },
    {
        item:"House Favorite Garlic Bread",
        description:"My go-to for garlic bread! French bread, butter, fresh garlic, garlic powder, Parmesan, and parsley. It’s so simple and so ridiculously good.",
        button:"Read More..."
    }
]
router.get('/home',(req,res)=>{
    if(req.session.user){
        res.render('home',{
            user:req.session.user,
            currenttime:new Date(),
            data:data
        })
    }else{
        res.render('base',{
            title:"Login System"
        })
    }
    
})

//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err)
            res.send("Error!!")
        }else{
            res.render('base',{
                title:"Login System",
                logout:"Logout Successfully!!!"
            })
        }
    })
})

module.exports=router;