var User = require('../models/user');
var level_global;
module.exports = function(app, passport){

app.get('/level0',isLoggedIn,function(req,res){
  isValid(req,res,0)
  // if(0<=req.user.unlocked){
  //   res.render('./levels/level1.ejs');
  //   User.findOneAndUpdate({'auth.id': req.user.auth.id}, { present_level: 0 }, function(err,docs){
  //     if(err)
  //       return err;
  //   })
  // }
  // else {
  //   res.send('foul!!!!')
  // }


})

app.get('/level1',isLoggedIn,function(req,res){
  isValid(req,res,1)
});

app.get('/level2',isLoggedIn,function(req,res){
isValid(req,res,2)

});
app.get('/level3',isLoggedIn,function(req,res){
isValid(req,res,2)

});
app.get('/level4',isLoggedIn,function(req,res){
isValid(req,res,2)

});
app.get('/level5',isLoggedIn,function(req,res){
isValid(req,res,2)

});
app.get('/level6',isLoggedIn,function(req,res){
isValid(req,res,2)

});
app.get('/level7',isLoggedIn,function(req,res){
isValid(req,res,2)

});
app.get('/level8',isLoggedIn,function(req,res){
isValid(req,res,2)

});
app.get('/level9',isLoggedIn,function(req,res){
isValid(req,res,2)

});

}
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}




function isValid(req,res,x) {
if(req.user.user_access != -1) {
  if(x<=req.user.unlocked){
    var red= './levels/level'+x;
    User.findOneAndUpdate({'auth.id': req.user.auth.id}, { present_level: x }, function(err,docs){
      if(err)
        return err;
    })
    res.render(red);
  }
  else {
    res.send('foul!!!!')
  }
}
else {
res.send("banned")
}


}
