const path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
sequelize=db.sequelize;

exports.getInvoices=(req,res)=>{
	var sqlFindUser="SELECT distinct(order_code) AS order_code ,reef_user.email , invoice_detail.date_of_billing, "+
	" reef_user.username FROM invoice_detail "+
	" INNER JOIN reef_user ON reef_user.id=invoice_detail.client_restaurant;";
	sequelize.query(sqlFindUser, { type: sequelize.QueryTypes.SELECT})
	.then(invoices => {
				res.send(invoices);     
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
exports.findByOrderCode=(req,res)=>{
	var sqlFindByorder_code="SELECT reef_user.email,header_invoice.id_header , invoice_detail.order_code, reef_user.username,invoice_detail.date_of_billing "+
	" FROM header_invoice "+
	" INNER JOIN invoice_detail ON invoice_detail.header_invoice=header_invoice.id_header "+
	" INNER JOIN reef_user ON invoice_detail.client_restaurant=reef_user.id where invoice_detail.order_code='"+req.params.order_code +"';";
	sequelize.query(sqlFindByorder_code,{type:sequelize.QueryTypes.SELECT})
	.then(invoice=>{
		res.send(invoice)
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
exports.findProductsByOrderCode=(req,res)=>{
	var sqlFindByorder_code="SELECT header_invoice.id_header,header_invoice.total,header_invoice.product_name,header_invoice.product_id,header_invoice.product_quantity , invoice_detail.order_code,invoice_detail.date_of_billing "+
	" FROM header_invoice "+
	" INNER JOIN invoice_detail ON invoice_detail.header_invoice=header_invoice.id_header "+
	" INNER JOIN reef_user ON invoice_detail.client_restaurant=reef_user.id where invoice_detail.order_code='"+req.params.order_code +"';";
	sequelize.query(sqlFindByorder_code,{type:sequelize.QueryTypes.SELECT})
	.then(invoice=>{
		res.send(invoice)
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
