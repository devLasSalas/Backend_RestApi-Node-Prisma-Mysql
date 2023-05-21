import { Router } from 'express';
import { prisma } from '../db.js';


const router = Router();

router.get('/', async ( req, res ) => {

    try {
        const products = await prisma.product.findMany();
        if( products.length < 1 ) return res.json({ ok: false, msg: 'No hay productos'});
        
        return res.json({ ok: true, products });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, error: error });
    }

});

router.get('/:id', async ( req, res ) => {

    try {
        const product = await prisma.product.findFirst({
            where: { id: parseInt(req.params.id) }, 	//where the product is stored in the db.
            include: { category: true }								//include all the information about the product.
        });
        if( !product ) return res.json({ ok: false, msg: 'Producto no existente' });
        
        return res.json({ ok: true, product });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, error: error });
    }


});

router.post('/', async ( req, res ) => {

    try {
        const newProduct = await prisma.product.create({
            data: req.body
        });
        
        return res.json({ ok: true, info: newProduct });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, error: error });
    }
});

router.put('/:id', async ( req, res ) => {

    try {
        const productUpdate = await prisma.product.update({
            where: { id: parseInt(req.params.id)},
            data: req.body // data a actualizar
        });
        
        return res.json({ ok: true, updated: productUpdate });
        
    } catch (error) {
        console.log(error);        
        return res.status(400).json({ ok: false, error: error });
    }
});

router.delete('/:id', async ( req, res ) => {

    try {
        const deleteProduct = await prisma.product.delete({
            where: { id: parseFloat(req.params.id) }
        });
        
        return res.json({ ok: true, data: deleteProduct });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, error: error });
    }
    
});

export default router;