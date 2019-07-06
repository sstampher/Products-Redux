const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const { Product } = require('./db');

//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(port, ()=> console.log(`listening on port ${port}`));

app.get('/api/products', async (req, res, next) => {
    try{
        res.send( await Product.findAll());
    }
    catch(err){
        next(err);
    }
})

app.delete('/api/products/:id', async (req, res, next) => {
    try{
        res.json( await Product.destroy({
            where: {
                id: req.params.id
               } 
           }));
    }
    catch(err){
        next(err);
    }
})

app.post('/api/products/', async (req, res, next) =>{
    try{
        console.log('>>>>>>>>>>>>>>>>>>', req);

        const newProduct = await Product.create(
            {name: req.body.name} );

        newProduct.save(); 

        res.send(newProduct);
    }
    catch(err){
        next(err);
    }
});

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));
