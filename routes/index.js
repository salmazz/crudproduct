module.exports={
    mainPage:(req,res)=>{
        let selectQuery = 'SELECT * FROM product ORDER BY productID DESC';
        db.query(selectQuery,(err,result)=>{
            if(err)
            return res.status(500).send(err);
            console.log(result);
            res.render('index.ejs',{
                title:"Welcome To Product Managment",
                products:result
            
            });

        });
    }
}