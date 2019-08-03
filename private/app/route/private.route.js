module.exports = function(app,express,path,isLoggedIn) {
    app.get(['/admin/main-courses/:page','/admin/appetizers/:page','/admin',
    '/admin/desserts/:page','/admin/drinks/:page','/admin/ingredients/:page',
    '/admin/invoices/:page'],isLoggedIn,(req,res)=>{
        res.status(200).sendFile(path.resolve(__dirname+'/../../../../reef-chinuch-restaurant-admin/build/index.html'));
    })
    app.use("/img", express.static(__dirname + '/../../../../chinuch-restaurant/public/images'));
    app.use("/admin",express.static(path.resolve(__dirname+'/../../../../reef-chinuch-restaurant-admin/build')));
    app.use("/static",express.static(path.resolve(__dirname+'/../../../../reef-chinuch-restaurant-admin/build/static')));
}