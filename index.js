const { render } = require('ejs');
const express = require('express')
const app = express();
exports.app = app;
const port = 3000

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const products = [];
exports.products = products;

for (let i = 1; i <= 100; i++) {
  const product = {
    id: i,
    name: `Product ${i}`,
    price: (Math.random() * 100).toFixed(2),
    description: `This is a description for Product ${i}`
  };
  products.push(product);
}

app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;

  const StartIndex = (page - 1) * limit;
  const EndIndex = page * limit;

  const pageinatedProducts = products.slice(StartIndex, EndIndex);

  // console.log(pageinatedProducts);
  res.render('products', { pageinatedProducts, limit, page })
})

app.get('/add-product', (req, res) => {
  res.render('add-product');
});

app.post('/add-product', (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    description
  };
  products.push(newProduct);
  res.redirect("/products");
})

app.get('/edit-product/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // product.find ถ้ามี array 1 ตัว ให้หยิบของมาใส่ในตัวแปร p แล้วดูว่า p.id มีค่าเท่ากับ parameter id รับเข้ามาไหม
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).send('Product not found');
  }
  res.render('edit-product', { product });
});

app.post('/edit-product', (req, res) => {

  const { id, name, price, description } = req.body;
  const productIndex = products.findIndex(p => p.id === parseInt(id));

  if (productIndex === -1) {
    return res.status(404).send('Product not found');
  }

  products[productIndex] = { id: parseInt(id), name, price, description };
  res.redirect('/products');

});

app.get('/delete-product/:id' , (req,res) => {
	const id = parseInt(req.params.id);
	const productIndex = products.findIndex(p => p.id === id);
	
	if(productIndex === -1){
		return res.status(404).send('Product not found');
	}
	
	products.splice(productIndex, 1);
	res.redirect('/products');

});

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
