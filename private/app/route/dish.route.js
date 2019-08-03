module.exports = function(app,upload,path,isLoggedIn) {
    const dish = require(path.resolve(__dirname+'/../db/controller/dish.controller.js')); 
    
    app.get('/api/get/main-courses', dish.getMainCourses);
    app.get('/api/get/appetizers',dish.getAppetizers);
    app.get('/api/get/desserts',dish.getDesserts);
    app.get('/api/dish/show/:id', dish.findById);
    
    app.delete('/api/dish/delete/:id', isLoggedIn,dish.delete);
    app.post('/api/dish/add/',[isLoggedIn,upload.single('picture')],dish.create);
    
    app.put('/api/dish/update/:id',isLoggedIn, dish.update);
    app.put('/api/dish/update-img/:id',[isLoggedIn, upload.single('picture')],dish.updateImg);
}