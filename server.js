var express=require('express');
var PORT=8080;
var multer=require('multer');
var upload=multer({
	dest:'upload/'
});
var app=express();

app.post('/uploadfile',upload.single('myfile'),function(req,res){
	//req.file
	
	var data={
		uploadedFile:req.file,
		bodyData:req.body
	}
		res.send(data);
	
})

app.use(express.static('./public'));

app.use(function(req,res){
	res.sendFile(__dirname+'/public/index.html');
})
app.listen(PORT,function(err){
	console.log(err||('Running @ '+PORT));
});