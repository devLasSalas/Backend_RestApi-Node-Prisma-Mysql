import express from 'express'
import routerProducts from './routes/products.routes.js';
import routerCategories from './routes/categories.routes.js';

const app = express();  //create an Express server

//Configuraciones
app.use( express.json() );

//Levantar servidor
app.listen(3000, () => console.log('Server an port 3000!'))


//Rutas
app.use('/api/v1/products', routerProducts);
app.use('/api/v1/categories', routerCategories);
