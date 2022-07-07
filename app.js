//load the module
let express=require("express");
let bodyparser=require("body-parser");
let fs=require("fs");
//Creating an array to store login details
loginDetails=[];
loginDetails=JSON.parse(fs.readFileSync("login.json"));

//we have to crete the refernce for express module.
let app=express();
// adding middelware module
app.use(bodyparser.urlencoded({extended:true}));
//localhost:9090/sayHello
app.get("/sayHello",(req,res)=>{
    res.send("Welcome to simple Express JS Program.")
});

app.get("/aboutus",(req,res)=>{
    res.send("Welcome to ABout US Page")
});

app.get("/contactus",(req,res)=>{
    res.send("Welcome to Contact US Page")
});
app.get("/info",(req,res)=>{
    res.send("<b>Welcome to simple Express JS Program.</b><font color=red>Welcome</font>")
});
//to get the complete HTML file 
app.get("/openHtml",(req,res)=>{
    // res.sendFile("D:\\Phase 3 nodeJs Code\\Express JS\\sample.html");
    // res.send(__dirname); //current directory path 
    res.sendFile(__dirname+"\\sample.html");
})
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"\\index.html");
})
app.get("/loginGet",(req,res)=>{
    res.sendFile(__dirname+"\\loginGet.html");
})

app.get("/loginPost",(req,res)=>{
    res.sendFile(__dirname+"\\loginPost.html");
})

app.get("/checkUser",(req,res)=>{
    let email=req.query.email;
    let pass=req.query.pass;
    if(email=="shweta@gmail.com" && pass=="123"){
        res.send("Successfully login");
    }
    else{
        res.send("Failure try again");
    }
})

app.get("/signUpPageOpen",(req,res)=>{
    res.sendFile(__dirname+"\\signUp.html");
})

app.post("/checkUser",(req,res)=>{
    let login=req.body;
    console.log(login);
   // let email=req.query.email;
    //let pass=req.query.pass;
    if(login.email=="shweta@gmail.com" && login.pass=="123"){
        res.send("Successfully login");
    }
    else{
        res.send("Failure try again");
    }
})

app.post("/signUp",(req,res)=>{
    let login=req.body;
    //email id must be unique
    //to check wjether login details are entered or not
    if(loginDetails.length>0){
        let result=loginDetails.find(ll=>ll.email==login.email)
        if(result==undefined){
            loginDetails.push(login);
            fs.writeFileSync("login.json",JSON.stringify(loginDetails));
            res.send("Account Created Successfully");
        }
        else{
                res.send("Email ID must be Unique");
        }
    }
    else{
            loginDetails.push(login);
            fs.writeFileSync("login.json",JSON.stringify(loginDetails));
            res.send("Account Created Successfully");
    }
    
})
app.listen(9090,()=>console.log("Server is running at port no. 9090"));