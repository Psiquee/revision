
var pool = require('./bd');

async function getJoyas() {
    var query = 'select * from joyas ';
    var rows = await pool.query (query);
    return rows;
}

async function insertJoya (obj){
    try {
        var query = "insert into joyas set ?";
        var rows = await pool.query (query, [obj])
        return rows;

    } catch (error){
        console.log (error);
        throw error;
    } //cierra catch
} // cierra insert

async function deleteJoyasById(id){
    var query = 'delete from joyas where id = ?';
    var rows = await pool.query (query, [id]);
    return rows;
}

/*Traiga la novedad x id unaxuna*/

async function getJoyaById(id) {
    var query = 'select * from joyas where id = ? ';
    var rows = await pool.query (query, [id]);
    return rows[0];
}
 /*actualizacion */

 async function modificarNovedadById (obj, id){
    try {
      var query = 'update novedades set ? where id=?';
      var rows = await pool.query(query, [obj, id]);
      return rows;
    } catch (error) {
      throw error;
    }
   }
  


module.exports = {getJoyas, insertJoya, deleteJoyasById, getJoyaById, modificarNovedadById}