const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const app = express();
const productos = require('../productos/modelos.js');
const cors = require('cors');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
        if (req.method === 'OPTIONS') return res.send(200)
    }
    next()
});
/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Saludos desde express');
});

router.get('/productos', function (req, res) {
    productos.listar((error, resultado) => {
        if (error) {
            res.send(error);
            return;
        }
        res.send(resultado);
    });

});
router.get('/productos/:id', function (req, res) {
    productos.leer(req.params.id, (error, resultado) => {
        if (error) {
            if (error.hasOwnProperty('statusCode')) {
                res.status(error.statusCode);
            } else {
                res.status(500);
            }
            res.send(error);
            return;
        }
        res.send(resultado);
    });
});
router.post('/productos', function (req, res) {
    productos.alta(req.body, (error, resultado) => {
        if (error) {
            if (error.hasOwnProperty('statusCode')) {
                res.status(error.statusCode);
            } else {
                res.status(500);
            }
            res.send(error);
            return;
        }
        res.send(resultado);
    });
});
router.put('/productos/:id', function (req, res) {
    if (parseInt(req.params.id) !== parseInt(req.body.id)) {
        res.status(400);
        res.send({message: 'No coincide id con el producto buscado'});
        return;
    }
    productos.modificacion(req.body, (error, resultado) => {
        if (error) {
            if (error.hasOwnProperty('statusCode')) {
                res.status(error.statusCode);
            } else {
                res.status(500);
            }
            res.send(error);
            return;
        }
        res.send(resultado);
    });
});

module.exports = router;
