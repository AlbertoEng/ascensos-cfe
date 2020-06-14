const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const Worker = require('./models/worker');
const morgan = require('morgan');


app.locals = ['Tecnico', 'Tecnico Superior','otro Depto']

app.set('port', process.env.PORT || 3000);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de coneccion a la base de datos:'));
db.once('open', function() {
  console.log("Base de datos Conectada Correctamente")
})

app.use(express.static(path.resolve(__dirname,'public')));
app.use(morgan('short'));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));

app.get('/',async (req,res)=>{

    workers = await Worker.find((err, workers)=>{
        if(err) throw new Error('Hay un error');
        return workers;
    });

    if(workers.length < 1){
        workers = null;
    }
    res.render('index',{
        route: 'href=/css/index.css',
        workers
    });
   
});

app.get('/new-worker',async (req,res)=>{

    res.render('new-worker',{
        route: 'href=/css/new-worker.css'
    });
   
});

app.post('/add-worker',async (req,res)=>{

    worker = new Worker(
        req.body
    );
    worker.save((err)=>{
        if(err) throw new Error('No se pudo guardar');
    });
    res.redirect('/');
});

app.get('/delete-worker',async (req,res)=>{

    workersActuales = await Worker.find((err, workers)=>{
        if(err) return new Error('Hubo un error en la consultar');
        return workers;
    });

    res.render('eliminar',{
        route: 'href=/css/eliminar.css',
        workersActuales,
        archivoJS: '/js/eliminar.js',
        url: req.url
    });
    
    
});


app.get('/delete-worker/:id', async (req, res)=>{
    await Worker.remove({_id: req.params.id });
    res.redirect('/');
})


app.listen(app.get('port'),()=>{
    console.log('Escuchando en puerto 3000');
})