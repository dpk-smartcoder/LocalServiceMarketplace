// const mongoose=require("mongoose");
const express=require("express");
const bodyParser=require("body-parser");
const _=require("lodash");
const ejs=require("ejs");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
// mongoose.connect("mongodb://localhost:27017/lsm",{useNewUrlParser:true});
// const serviceProviderSchema=new mongoose.Schema({
//     name:String,
//     pno:Number,
//     email:String,
//     category:String,
//     city:String,
//     description:String
// });
// const Provider= mongoose.model("Provider",serviceProviderSchema);
app.use(express.static(__dirname+"/public"));
app.set('view engine', 'ejs');
app.get("/",(req,res)=>{
    res.render("home");
});
app.get("/about",(req,res)=>{
    res.render("about");
});
app.get("/categories",(req,res)=>{
    Provider.find({}).then((providers)=>{
        var p=[];
                for(var i=0;i<providers.length;i++){
                    var x=1;
                for(var j=0;j<p.length;j++){
                    if(providers[i].category===p[j].category){x=0;break;}
                }
            if(x!=0){p.push(providers[i]);}}
        res.render("categories",{providers:p});});
});
app.get("/contact",(req,res)=>{
    res.render("contact");
});
app.get("/provide_service",(req,res)=>{
    res.render("provide_service");
});
app.post("/provide_service",(req,res)=>{
    const n=req.body.name;
    const p=req.body.pno;
    const e=req.body.email;
    const cat=req.body.category;
    const c=req.body.city;
    const d=req.body.description;
    const per=new Provider({
        name:_.upperFirst(n),
        pno:p,
        email:e,
        category:_.upperCase(cat),
        city:_.upperFirst(c),
        description:d
    });
    per.save();
 res.redirect("/provide_service");
});
app.get("/categories/:c",(req,res)=>{
    Provider.find({category:req.params.c}).then(
        (providers)=>{
            res.render("providers_list",{c:req.params.c,providers:providers});
        }
    );
});
app.get("/providers/:id",(req,res)=>{
    Provider.find({_id:req.params.id}).then(
        (provider)=>{
            res.render("provider",{provider:provider});
        }
    );
});
app.listen(3000,()=>{
    console.log("server started");
});

