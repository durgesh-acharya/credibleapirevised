const express = require('express')
const app = express()
const router = express.Router();
const bodyParser = require('body-parser');



const port = process.env.PORT || 3000

//routes
const userRouter = require('./routes/user');
const cateRouter = require('./routes/cate');
const subcateRouter = require('./routes/subcate');
const productRouter = require('./routes/product');
const productimageurlRouter = require('./routes/prodimg');
const qrRouter = require('./routes/qr');
const reedemRouter = require('./routes/reedem');
const adminRouter = require('./routes/admin')

//use routes
app.use(userRouter);
app.use(cateRouter);
app.use(subcateRouter);
app.use(productRouter);
app.use(productimageurlRouter);
app.use(qrRouter);
app.use(reedemRouter);
app.use(adminRouter);

app.use(bodyParser.urlencoded({extended: true}));



app.get('/', (req, res) => {
  res.send('Hello World! app is running succesfully on 3000!')
})

app.get('/testinf', (req, res) => {
  res.send('Hello World from testing routes!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})