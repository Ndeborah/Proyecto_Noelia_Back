const db = require('../tools/database');

class Producto {
    constructor(nombre, descripcion, categoria) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.descripcion = descripcion;
    }
}

Producto.listar = result => {
    db.query('SELECT * FROM productos;', (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};
Producto.leer = (id, result) => {
    db.query(`SELECT * FROM productos where id = ${id};`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({message: `Producto ${id} no encontrado`, statusCode: 404}, null);
    });
};
Producto.alta = (producto, result) => {
    db.query(`insert into ?? set ?`, ['productos', producto], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, producto);
        }
    );
};
Producto.modificacion = (producto, result) => {
    db.query(`update ?? set ? where id = ?`, ['productos', producto, producto.id], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, producto);
        }
    );
};
Producto.borrar = (producto, result) => {
    db.query(`delete ?? set ? where id = ?`, ['productos', producto, producto.id], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, producto);
        }
    );
};
module.exports = Producto;