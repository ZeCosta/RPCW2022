var express = require('express');
var router = express.Router();
var axios = require('axios')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/musicas');
});

router.get('/musicas', function(req, res, next) {
  axios.get("http://localhost:3000/musicas")
    .then(response => {
        var lista = response.data
        //console.log(lista[0])
        var d = new Date().toISOString().substring(0, 16)
        res.render('musicas', {date:d, title: "musicas", musicas: lista });          //renderizar view

    })
    .catch(function(erro){
      console.log(erro.message)
      res.render('error', { title: "Erro", error: erro });                 //renderizar view de erro
    })
});


router.get('/musicas/inserir', function(req, res, next) {     //:id serve para fazer a captura do id (rota paramétrica)
  var d = new Date().toISOString().substring(0, 16)
  res.render('musicas_form', {date:d});          //renderizar view

});

router.post('/musicas',function(req,res,next){
  //console.log("POST de musica " + JSON.stringify(req.body))
  //axios.post("http://localhost:3000/musicas", req.body)
  axios.post('http://localhost:3000/musicas', req.body)
    .then(resp => {
      //console.log("Success")
      //console.log(resp.data)
      res.redirect('/musicas');
    })
    .catch(erro=> {
      console.log("Error")
      console.log(erro)
      res.render('error', { error: erro });              //renderizar view de erro
    })
});

router.get('/musicas/:id', function(req, res, next) {     //:id serve para fazer a captura do id (rota paramétrica)
  id=req.params.id                                       //ir buscar o id ao req.params
  axios.get("http://localhost:3000/musicas/"+id)
    .then(response => {
        var m = response.data
        var d = new Date().toISOString().substring(0, 16)
        res.render('musica', {date:d,  musica: m });          //renderizar view

    })
    .catch(function(erro){
      res.render('error', { error: erro });              //renderizar view de erro
    })
});



router.get('/musicas/prov/:id', function(req, res, next) {     //:id serve para fazer a captura do id (rota paramétrica)
  id=req.params.id                                       //ir buscar o id ao req.params
  axios.get("http://localhost:3000/musicas?prov="+id)
    .then(response => {
        var lista = response.data
        var d = new Date().toISOString().substring(0, 16)
        res.render('provs', {date:d, provId: id, provs: lista });          //renderizar view

    })
    .catch(function(erro){
      res.render('error', { error: erro });              //renderizar view de erro
    })
});



module.exports = router;
