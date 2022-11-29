var express = require('express');
const pool = require('../../models/bd');
var router = express.Router();
var joyasModel = require ('../../models/joyasModel')


/* para alistar novedades */
router.get('/', async function (req, res, next) {

  var joyas = await joyasModel.getJoyas();

  res.render('admin/joyas' , {  //joyas.hbs
    layout: 'admin/layout' ,  //layout.hbs
    usuario: req.session.nombre,
    joyas
  });
}); //cierre inicial

//diseno de agregar
router.get ('/agregar', (req, res, next) => {
  res.render ('admin/agregar', {
    layout: 'admin/layout'
  }) //cierra render
})// cierra get

/*insertar joya*/ 
router.post ('/agregar', async (req, res,next) => {
  try {
    if ( req.body.titulo != "" && req.body.descripcion !="" && req.body.imagen !="" && req.body.precio != "") {
      await joyasModel.insertJoya(req.body);
      res.redirect ('/admin/joyas')
    } else {
      res.render('admin/agregar', {
        layout:'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render ('admin/agregar', {
      layout:'admin/layout',
      error: true, 
      message: 'No se cargo la joya'
    })
  }
})

/*Eliminar */ //:id para que el numero sea aleatorio. params captura el dato
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;

  await joyasModel.deleteJoyasById(id);
  res.redirect('/admin/joyas');
});
//cierra get de eliminar

/*modificar la vista > formulario y los datos cargados */
 router.get('/modificar/:id', async( req, res, next) => {
  var id = req.params.id;
  //console.log(req.params.id);
  var joya = await joyasModel.getJoyaById(id);

 
  res.render('admin/modificar',  {
    layout: 'admin/layout',
    joya
  })
 });

/*Actualizar */
router.post('/modificar', async (req, res, next) => {
  try {
    var obj = {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      imagen: req.body.imagen,
      precio: req.body.precio
    }
    //console.log(obj)
   //console.log(req.body.id)
    await joyasModel.modificarNovedadById (obj, req.body.id);
    res.redirect('/admin/joyas');
  } catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout :'admin/layout' ,
      error: true,
      message: 'No se modifico la joya'
    })
  }
})

module.exports = router;
