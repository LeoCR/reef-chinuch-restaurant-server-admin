module.exports = function(app,express,path,isLoggedIn) {
    app.use('/css/',express.static(path.resolve(__dirname+'/../../../public/css/')));
    app.use('/img/',express.static(path.resolve(__dirname+'/../../../public/img/')));
}