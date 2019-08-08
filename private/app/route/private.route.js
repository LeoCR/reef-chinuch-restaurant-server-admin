module.exports = function(app,express,path,isLoggedIn) {
    app.get([
      '/admin/users/:page','/admin/edit/user/:id','/admin/users','/admin/add/user',
      '/admin/main-courses','/admin/add/main-course','/admin/main-courses/:page','/admin/edit/main-course/:id',
      '/admin/desserts','/admin/add/dessert','/admin/desserts/:page','/admin/edit/dessert/:id',
      '/admin/appetizers','/admin/add/appetizer','/admin/appetizers/:page','/admin/edit/appetizer/:id',
      '/admin/ingredients','/admin/add/ingredient','/admin/ingredients/:page',
      '/admin/drinks','/admin/add/drink','/admin/drinks/:page',
      '/admin/invoices','/admin/edit/invoice/:order_code','/admin/invoices/:page'
    ],isLoggedIn,(req,res)=>{
        res.status(200).sendFile(path.resolve(__dirname+'/../../../../reef-chinuch-restaurant-admin/build/index.html'));
    })
    app.use("/img", express.static(__dirname + '/../../../../chinuch-restaurant/public/images'));
    app.get('/admin/',function(req,res){
      if (req.user) {
          res.status(200).sendFile(path.resolve(__dirname+'/../../../../reef-chinuch-restaurant-admin/build/index.html'));
          
      } else {
          res.setHeader('Content-Type', 'text/html')
          res.write('<p>Not Authorized</p>')
          res.end()
      }
    });
    app.use("/static",isLoggedIn,express.static(path.resolve(__dirname+'/../../../../reef-chinuch-restaurant-admin/build/static')));
}