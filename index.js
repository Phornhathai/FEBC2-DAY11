const { render } = require('ejs');
const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

const products = [];

for (let i = 1; i <= 100; i++) {
  const product = {
    id: i,
    name : `Product ${i}`,
    price : (Math.random() * 100).toFixed(2),
    description : `This is a description for Product ${i}`
  };
  products.push(product);
}

// console.log(products);

app.get('/products', (req,res)=> {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;

  const StartIndex = (page-1) * limit;
  const EndIndex = page * limit;

  const pageinatedProducts = products.slice(StartIndex,EndIndex);

  // console.log(pageinatedProducts);
  res.render('products',{pageinatedProducts,limit,page})
})

app.get('/', (req, res) => {
  // res.send('Hello World!')
  res.render('index');
})

app.get('/about', (req, res) => {
  // res.send('about page');
  res.render('about');
})

app.get('/page2', (req, res) => {
  const name = req.query.name;
  const age = req.query.age;
  res.render('page2', { name, age });
})

app.get('/page2', (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
