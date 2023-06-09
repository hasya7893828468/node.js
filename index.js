const http=require('http')
const path=require('path')
const fs =require('fs')

const server=http.createServer((req,res)=>{
// if(req.url==="/"){

//     fs.readFile(path.join(__dirname,'public','index.html'),(err,data)=>{
//       if(err)throw err;
//       res.writeHead(200,{'Content-Type':'text/html'})
//       res.end(data)
//     })
// }

// if(req.url==="/about"){

//   fs.readFile(path.join(__dirname,'public','about.html'),(err,data)=>{
//     if(err)throw err;
//     res.writeHead(200,{'Content-Type':'text/html'})
//     res.end(data)
//   })
// }
// if(req.url==="/api/users"){
// const users=[
// {name:"ram",age:40},
// {name:"rakesh",age:55}
// ]
// res.writeHead(200,{'Content-Type':'application/json'})
// res.end(JSON.stringify(users))
// }

let filepath=path.join(
  __dirname,
  'public',
  req.url==="/"?'index.html':req.url
  )
 let extname=path.extname(filepath);

 let contentType='text/html'
switch(extname){
  case '.js':
      contentType='text/javascript';
    break;
  case '.css':
      contentType='text/css';
    break;
  case '.json':
       contentType='application/json';
    break;
  case '.png':
       contentType='image/png';
    break;
   case '.jpg':
      contentType='image/jpg';
     break;
}
fs.readFile(filepath,(err,content)=>{
  if(err){
    if(err.code=='ENOENT'){
      fs.readFile(path.join(__dirname,'public','404.html'),(err,content)=>{
        res.writeHead(200,{'ContentType':'text/html'})
        res.end(content,'utf8')
      })
    }
    else{
      res.writeHead(500);
      res.end(`server error:${err.code}`)
    }
  }else{
    res.writeHead(200,{'ContentType': contentType})
    res.end(content,'utf8')


  }
})

})

const PORT=process.env.PORT || 2000 ;
server.listen(PORT,()=>console.log(`server running on port:${PORT}`))