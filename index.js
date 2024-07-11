import { dbPool } from "./utils/dbcon.js";

async function insertBuku(judul, penulis, harga, stok) {
  try {
    let query =
      "INSERT INTO buku (judul, penulis, harga, stok) VALUES (?, ?, ?, ?)";

    const [result] = await dbPool.query(query, [judul, penulis, harga, stok]);

    return result.insertId;
  } catch (error) {
    throw error;
  }
}

async function getAllBuku() {
  let query = "SELECT * FROM buku";
  const [result] = await dbPool.query(query);
  return result;
}

async function updateBuku(judul, penulis, harga, stok, id) {
  try {
    let query =
      "UPDATE buku SET judul =?, penulis =?, harga =?, stok =? WHERE id_buku =?";
    const [result] = await dbPool.query(query, [
      judul,
      penulis,
      harga,
      stok,
      id,
    ]);

    return result.affectedRows;
  } catch (error) {
    throw error;
  }
}

async function deleteBuku(id) {
  try {
    let query = "DELETE FROM buku WHERE id_buku =?";
    const [result] = await dbPool.query(query, [id]);

    return result.affectedRows;
  } catch (error) {
    throw error;
  }
}

async function getDetailBuku(judul, penulis, harga, stok) {
  let query =
    "SELECT * FROM buku WHERE judul LIKE '%" +
    judul +
    "%' OR penulis LIKE '%" +
    penulis +
    "%' OR harga LIKE '%" +
    harga +
    "%' OR stok LIKE '%" +
    stok +
    "%' ";

  const [result] = await dbPool.query(query);

  return result;
}

async function getBukuMahal() {
  let query = "SELECT * FROM buku WHERE harga > 20000";
  const [result] = await dbPool.query(query);

  return result;
}

async function getStokSedikit() {
  let query = "SELECT * FROM buku WHERE stok < 50";
  const [result] = await dbPool.query(query);

  return result;
}

async function getHargaRataRata() {
  let query = "SELECT AVG(harga) AS rata_rata FROM buku";
  const [result] = await dbPool.query(query);

  return result[0].rata_rata;
}

// let insertData = await insertBuku(
//   "Bumi Manusia",
//   "Pramoedya Ananta Toer",
//   15000,
//   5
// );

// let getAllData = await getAllBuku();
// let updateData = await updateBuku(
//   "Langit Bumi",
//   "Pramoedya Ananta Toer",
//   15000,
//   5,
//   13
// );
// let deleteData = await deleteBuku(insertData);
// let detailData = await getDetailBuku(
//   "Bumi Manusia",
//   "Pramoedya Ananta Toer",
//   15000,
//   5
// );
// let bukuMahal = await getBukuMahal();
// let stokSedikit = await getStokSedikit();
let rataRata = await getHargaRataRata();

// console.log("data insert", insertData);
// console.log("data all", getAllData);
// console.log("data update", updateData);
// console.log("data delete", deleteData);
// console.log("detail data", detailData);
// console.log("data buku diatas 20000", bukuMahal);
// console.log("data stok dibawah 50", stokSedikit);
console.log("harga rata rata", rataRata);
