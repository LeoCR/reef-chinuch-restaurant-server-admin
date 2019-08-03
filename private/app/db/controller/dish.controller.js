var path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
sequelize=db.sequelize;
Dish = db.dish;
exports.getMainCourses=(req,res)=>{
	var sqlGetMainCourses="SELECT * FROM dish WHERE category='Main Course';";
    sequelize.query(sqlGetMainCourses, { type: sequelize.QueryTypes.SELECT})
    .then(user => {
                res.send(user);     
    })
}
exports.getAppetizers=(req,res)=>{
	var sqlGetMainCourses="SELECT * FROM dish WHERE category='Appetizer';";
    sequelize.query(sqlGetMainCourses, { type: sequelize.QueryTypes.SELECT})
    .then(user => {
                res.send(user);     
    })
}
exports.getDesserts=(req,res)=>{
	var sqlGetMainCourses="SELECT * FROM dish WHERE category='Dessert';";
    sequelize.query(sqlGetMainCourses, { type: sequelize.QueryTypes.SELECT})
    .then(user => {
                res.send(user);     
    })
}
exports.findAll = (req, res) => {
	Dish.findAll().then(dish => {
	  res.send(dish);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.delete = (req, res) => {
	const id = req.params.id;
	Dish.destroy({
			where: { id: id }
		}).then(() => {
			res.status(200).json( { msg: 'Deleted Successfully -> dish Id = '  } );
		}).catch(err => {
			res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.create = (req, res) => {	
  Dish.create({  
		id: req.body.id,
		name: req.body.name,
		description: req.body.description,
		picture:'/img/uploads/'+req.file.filename,
		category:req.body.category,
		price:req.body.price 
	}).then(dish => {		
		  res.status(200).send(dish);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.findById = (req, res) => {
	Dish.findByPk(req.params.id).then(dish => {
		res.send(dish);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.update = (req, res) => {
	Dish.update({  
		  id: req.body.id,
		  name: req.body.name,
		  description: req.body.description,
		  category:req.body.category,
		  subcategory:req.body.subcategory,
		  price:req.body.price 
	  }, 
	{ where: {id: req.body.id}}).then(dish => {	
			res.status(200).send(dish);
	  }).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.updateImg = (req, res) => {
  Dish.update({  
		id: req.body.id,
		name: req.body.name,
		description: req.body.description,
		picture:'/img/uploads/'+req.file.filename,
		category:req.body.category,
		subcategory:req.body.subcategory,
		price:req.body.price 
	}, 
  { where: {id: req.body.id}}).then(dish => {	
		  res.status(200).send(dish);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};