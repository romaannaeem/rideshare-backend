const mongoose = require('mongoose');

before(done => {
  mongoose.connect(
    'mongodb://romaan:admin123@ds211083.mlab.com:11083/muber_test'
  );
  mongoose.connection.once('open', () => done()).on('error', err => {
    console.warn('Warning', error);
  });
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers
    .drop()
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    .catch(() => done());
});
