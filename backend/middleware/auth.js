const jwt = require('jsonwebtoken');
module.exports = function(req,res,next){
  const token = req.header('Authorization')?.split(' ')[1];
  if(!token) return res.status(401).json({msg:'No token'});
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'replace_this_with_a_secure_secret');
    req.user = decoded.user;
    next();
  }catch(err){
    return res.status(401).json({msg:'Token invalid'});
  }
}
