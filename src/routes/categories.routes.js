import { Router } from 'express';
import { prisma } from '../db.js';


const router = Router();

router.get('/', async ( req, res ) => {

    try {
        const categories = await prisma.category.findMany({
            include: { products: true }
        });
        if( categories.length < 1 ) return res.json({ ok: false, msg: 'No hay categorias '});
        
        return res.json({ ok: true, data: categories });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, error: error });
    }
});

router.get('/:id', async ( req, res ) => {

    try {
        const categorie = await prisma.category.findFirst({
            where: { id: parseInt(req.params.id)}
        });
        if( categorie === null ) return res.json({ ok: false, msg: 'Categoria no encontrada' });

        return res.json({ ok: true, categorie });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, error: error });
    }
});

router.put('/:id', async ( req, res ) => {

    try {
        const categorieUpdate = await prisma.category.update({
            where: { id: parseInt(req.params.id)},
            data: req.body
        });

        return res.json({ ok: true, data: categorieUpdate });


    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, error: error });
    }
});

router.post('/', async ( req, res ) => {

    try {
        const newCategorie = await prisma.category.create({
            data: req.body
        });
        
        res.json({ ok: true, data: newCategorie });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, error: error });
    }

});

router.delete('/:id', async ( req, res ) => {

    try {
        const categorieDelete = await prisma.category.delete({
            where: { id: parseInt(req.params.id)}
        });        

        return res.json({ ok: true, msg: 'Categoria eliminada correctamente '});

        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, error: error }); 
    }
});


export default router;