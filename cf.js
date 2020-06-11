var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var request = require("request");

var a = [];var b = [];var c = [];var d = [];var e = [];var f = [];var g = [];var h = [];var name;var use = {};

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/",function(req,res)
	   {
	res.render("home.ejs");
});

app.get("/point1",function(req,res)
	   {
	for(var i=0;i<use.result.length;i++)
	{
		b.push(use.result[i].newRating);
		a.push("Contest "+((i+1).toString()));
	}
	res.redirect("/point2");
});

app.get("/point2",function(req,res)
	   {
	var url = "https://codeforces.com/api/user.status?handle="+name+"&from=1&count=10000";
	request(url,function(error,response,body)
		   {
		if(!error && response.statusCode == 200)
			{
				use = JSON.parse(body);
				res.redirect("/point3");
			}
	});
});

app.get("/point3",function(req,res)
	   {
	let store = new Map();
	for(var i=0;i<use.result.length;i++)
		{
			var x = use.result[i].problem.rating;
			if(use.result[i].verdict=="OK")
				{
					if(store.has(x)==true)
						{
							var y = store.get(x);
							store.delete(x);
							store.set(x,y+1);
						}
					else
						{
							var zw = 1;
							store.set(x,zw);
						}
				}
		}
	store.forEach(function(value,key)
				 {
		if(key!=="null")
			{
				c.push(key);
				d.push(value);
			}
	})
	res.redirect("/point4");
});

app.get("/point4",function(req,res)
	   {
	let store = new Map();
	for(var i=0;i<use.result.length;i++)
		{
			var x = use.result[i].verdict;
			if(store.has(x)==true)
				{
					var y = store.get(x);
					store.delete(x);
					store.set(x,y+1);
				}
			else
				{
					var zw = 1;
					store.set(x,zw);
				}
		}
	store.forEach(function(value,key)
				 {
		e.push(key);
		f.push(value);
	})
	res.redirect("/ratings");
	//res.render("prac.ejs",{a:a,b:b,c:c,d:d,e:e,f:f});
});

app.get("/ratings",function(req,res)
	   {
	let store = new Map();
	for(var i=0;i<use.result.length;i++)
		{
			
			for(var j=0;j<use.result[i].problem.tags.length;j++)
				{
					if(use.result[i].verdict=="OK")
					{
						var x = use.result[i].problem.tags[j];
					if(store.has(x)==true)
						{
							var y = store.get(x);
							store.delete(x);
							store.set(x,y+1);
						}
					else
						{
							var zw = 1;
							store.set(x,zw);
						}
					}
					
				}
		}
	store.forEach(function(value,key)
				 {
		g.push(key);
		h.push(value);
	})
	res.render("prac.ejs",{a:a,b:b,c:c,d:d,e:e,f:f,g:g,h:h});
});

app.post("/details",function(req,res)
		{
	name  = req.body.attribute;
	var url = "https://codeforces.com/api/user.rating?handle="+name;
	request(url,function(error,response,body)
		   {
		if(!error && response.statusCode == 200)
			{
				use = JSON.parse(body);
				res.redirect("/point1");
			}
	});
});

app.listen(3000,function(req,res)
		  {
	console.log("Server has Started...");
});