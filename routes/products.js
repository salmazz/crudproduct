
let fs = require('fs');
let path = require('path');
module.exports = {
    addProductPage: (req, res) => {
        res.render('add_product.ejs', {
         data: "no data exists",
         message:"Manage Products",
        title:"Add New Products"
        });
    },
    addProduct:(req,res)=>{
       if(!req.files)
           return res.status(400).send("No Product Images Were Uploaded");
           let message = '',
           title=req.body.title,
           quantity=req.body.quantity,
           price=req.body.price,
           category=req.body.category,
           desc=req.body.desc,
           UploadedFile = req.files.image;
    //  UploadedFile = req.files.image
     let insert="INSERT INTO`product`(`title`, `Quantity`, `price`, `Category`, `image`, `description`) VALUES ('"+title+ "',"  + quantity + "," + price + ",'" +category + "','" +UploadedFile.name + "','" +desc+"')";
    db.query(insert,(err,result)=>{
    if(err){
    return res.status(500).send(err);
    console.log(err);
    }
    else 
    message = 'Product'+ result.insertId + "Added Successfully";
    // uplode product file 
    let fileExension = UploadedFile.name.split('.')[1];
    let image_name = result.insertId+ "." +fileExension;
    if(UploadedFile.mimetype=='image/png'||UploadedFile.mimetype=='image/jpeg' || UploadedFile.mimetype=='image/gif' || UploadedFile.mimetype == 'image/jpg'){
        UploadedFile.mv('public/assests/img/'+image_name,(err)=>{
        if(err)
        return  res.status(500).send(err);
        });
        res.redirect('/');
    }else {
        message = "invalid fourm only png jpeg gif and jpg";
        res.render('add_product.ejs',{
        message:message,
        title:'Add New Product | Product Managment'
    });
    }
    });
    },
    editProductPage:(req,res)=>{
    let productId =req.params.id;
    let selectQuery = 'SELECT * FROM product WHERE productID='+productId;
    db.query(selectQuery, (err, result) => {
        if (err)
            return res.status(500).send(err);
        res.render('edit_product.ejs', {
            title: "Welcome To Product Managment",
            product: result[0],
            message:result[0].title

        });

    });
  
    },
    editProduct:(req,res)=>{
    let message = '',
    title = req.body.title,
    quantity = req.body.quantity,
    price = req.body.price,
    category = req.body.category,
    desc = req.body.desc,
    UploadedFile = req.files.image;
    let productId = req.params.id;

    let updateQuery = "UPDATE `product` SET"
    + "`title` ='" +title+"', `Quantity` = "+quantity+","
    +" `price` = "+price+", `Category` = '"+category+"',"
    +" `image` ='"+ UploadedFile.name +"', `description` = '"+desc+"'"
    +" WHERE `productID` ="+productId;
       db.query(updateQuery, (err, result) => {
           if (err) {
               return res.status(500).send(err);
               console.log(err);
           } else
               message = 'Product' + productId + "Updated Sueccfully";
           // uplode product file 
           let fileExension = UploadedFile.name.split('.')[1];
           let image_name = productId + "." + fileExension;
           if (UploadedFile.mimetype == 'image/png' || UploadedFile.mimetype == 'image/jpeg' || UploadedFile.mimetype == 'image/gif' || UploadedFile.mimetype == 'image/jpg') {
               UploadedFile.mv('public/assests/img/' + image_name, (err) => {
                   if (err)
                       return res.status(500).send(err);
               });
               res.redirect('/');
           } else {
               message = "invalid fourm only png jpeg gif and jpg";
               res.render('add_product.ejs', {
                   message: message,
                   title: 'Edit  Product | Product Managment'
               });
           }
       });

    },
    deleteProduct:(req,res)=>{
    let productId = req.params.id;
    let deleteProduct = 'DELETE FROM product WHERE productID=' + productId;
    db.query(deleteProduct, (err, result) => {
        if (err)
            return res.status(500).send(err);
            // fs.unlink("public/assests/img/"+productId+".jpg",(err)=>{
            // return res.status(500).send(err);
            // });
          
            fs.unlink(path.join("public/" + path,productId+".jpg"), function (response) {
                                console.log('File deleted!');

            });
    res.redirect('/');
    res.end();

    });
    }
    }