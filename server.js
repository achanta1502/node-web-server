const express = require('express');
const hbs = require('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000;
var app=express();
hbs.registerPartials(__dirname+'/views/partials')    //to inject repeated tags and data in hbsx
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurretnYear',()=>{           //to render the values into hbs
  return new Date().getFullYear()
});

app.use((req, res, next)=>{
  var now=new Date().toString();
  var log=`${now}:${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log',log+'\n',(err)=>{
  if(err){
    console.log('Unable to append to server.log');
  }
})
  next();
});
// app.use((req,resp,next)=>{
// resp.render('maintainance.hbs');}              //used to get constat pages
//
// );
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase()
});
app.get('/',(req,resp)=>{
  //resp.send('<h1>Hello Express!</h1>');
  // resp.send({
  //   name:'Achanta',
  //   likes:['Browsing','surfing']
  // });
  resp.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeTitle:'Welcome to my website',

  })
});
app.get('/about',(req,resp)=>{
  resp.render('about.hbs',{
    pageTitle:'About Page'

  });
});
app.get('/bad',(req,resp)=>{
  resp.send({
    error:'Not found'
  });
});
app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
