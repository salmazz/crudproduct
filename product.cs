using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
namespace Product
{
    #region Product
    public class Product
    {
        #region Member Variables
        protected int _productID;
        protected string _title;
        protected int _Quantity;
        protected unknown _price;
        protected string _Category;
        protected string _image;
        protected string _description;
        #endregion
        #region Constructors
        public Product() { }
        public Product(string title, int Quantity, unknown price, string Category, string image, string description)
        {
            this._title=title;
            this._Quantity=Quantity;
            this._price=price;
            this._Category=Category;
            this._image=image;
            this._description=description;
        }
        #endregion
        #region Public Properties
        public virtual int ProductID
        {
            get {return _productID;}
            set {_productID=value;}
        }
        public virtual string Title
        {
            get {return _title;}
            set {_title=value;}
        }
        public virtual int Quantity
        {
            get {return _Quantity;}
            set {_Quantity=value;}
        }
        public virtual unknown Price
        {
            get {return _price;}
            set {_price=value;}
        }
        public virtual string Category
        {
            get {return _Category;}
            set {_Category=value;}
        }
        public virtual string Image
        {
            get {return _image;}
            set {_image=value;}
        }
        public virtual string Description
        {
            get {return _description;}
            set {_description=value;}
        }
        #endregion
    }
    #endregion
}