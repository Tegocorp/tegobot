let db = null;

exports.setDatabase = (_db) => {
  db = _db;
};

const someQuery = () =>
  new Promise((resolve) => {
    resolve(true);
    console.log(db);
  });

exports.queries = {
  someQuery,
};
