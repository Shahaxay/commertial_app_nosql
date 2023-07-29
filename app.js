const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const User=require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const database = require('./util/database');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//adding user for each request through middleware through which request always funneled through
app.use(async(req, res, next) => {
    try{
        const user=await User.findUserByID('64c4eafc69810df084ed6dc5');
        req.user=user._id;
        next();
        
    }
    catch(err){
        console.log(err);
    }
})

app.use('/admin', adminRoutes); 
app.use(shopRoutes);

// app.use(errorController.get404);

database.mongoConnect( 
        () => {
            app.listen(3000,()=>console.log('listening to 3000...'));
        }
)