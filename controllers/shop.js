const Product = require('../models/product');
const User=require('../models/user');

exports.getProducts = async(req, res, next) => {
  try{
    const products=await Product.findAll();
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }
  catch(err){
    console.log(err);
  };
};

exports.getProduct = async(req, res, next) => {
  const prodId = req.params.productId;
  try{
    console.log(prodId);
    const product = await Product.findByPk(prodId);
    console.log(product);
    res.render('shop/product-detail', { product: product, pageTitle: product.title, path: '/products' });
  }
  catch(err){
    console.log(err);
  }
}

exports.getIndex = async(req, res, next) => {
  try{
    const products=await Product.findAll();
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }
  catch(err){
    console.log(err);
  }
};

exports.getCart = async (req, res, next) => {
  try{
    const products=await req.user.getCart();
    // console.log(products);
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products,
      totalPrice: "not calculated yet"
    });
  }
  catch(err){
    console.log(err);
  }
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  try{
    const products=await req.user.addToCart(prodId);
    console.log(products);
    console.log("added successfully");
    res.redirect('./cart');
  }catch(err){
    console.log(err);
  }

}

exports.postDeleteCartItem = async (req, res, next) => {
  const prodId = req.body.productId;
  try{
    await req.user.deleteCartItem(prodId);
    console.log("cart item removed");
    res.redirect('/cart');
}
catch(err){
  console.log(err);
}
}

exports.getOrders = async (req, res, next) => {

  try{
    let orders=await req.user.getOrders();
    orders=orders.map(item=>{return {_id:item._id,orderItem:item.orderItem}})
    console.log(orders);
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders:orders
    });
  }catch(err){
    console.log(err);
  }
};

exports.postOrder=async (req,res,next)=>{
  try{
    const result=await req.user.makeOrder();
    console.log(result);
    res.redirect('/orders');
  }
  catch(err){
    console.log(err);
  }
}

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout'
//   });
// };
