const path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
User = db.reef_user,
sequelize=db.sequelize;
var bCrypt = require('bcrypt-nodejs');
exports.findAll=(req,res)=>{
    User.findAll().then(user => {
        res.send(user);
    }).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
exports.findByEmail=(req,res)=>{
    User.findOne({ where: {email: req.params.email} }).then(user => {
        // project will be the first entry of the Projects table with the title 'aProject' || null
        if(user){
            res.send(user)
        }
        else{
            res.json({user:null});
        }
    }).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
exports.findById = (req, res) => {	
	User.findByPk(req.params.id).then(user => {
		res.send(user);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
var generateHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};
exports.countUsers=(req,res)=>{
    var sqlTotalUsers="SELECT MAX(id) as MaxIdUser FROM reef_user;";
    sequelize.query(sqlTotalUsers, { type: sequelize.QueryTypes.SELECT})
    .then(maxUserId => {
                res.send(maxUserId[0]);     
    })
}
exports.update=(req,res)=>{
    var userPassword = generateHash(req.body.password);
    User.update({  
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username:req.body.username,
        about:req.body.about,
        email: req.body.email,
        password:userPassword
    }, 
  { where: {id: req.body.id}}).then(user => {	
          res.status(200).send(user);
    }).catch(err => {
      res.status(500).json({msg: "An error occurred.", details: err});
  });
}
exports.delete = (req, res) => {
	const id = req.params.id;
	User.destroy({
			where: { id: id }
		}).then(() => {
			res.status(200).json( { msg: 'Deleted Successfully -> StrongDish Id = '  } );
		}).catch(err => {
			res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.create=(req,res)=>{
    var userPassword = generateHash(req.body.password);
    User.create({  
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username:req.body.username,
        about:req.body.about,
        email: req.body.email,
        password:userPassword
    }).then(user => {	
          res.status(200).send(user);
    }).catch(err => {
      res.status(500).json({msg: "An error occurred.", details: err});
  });
}