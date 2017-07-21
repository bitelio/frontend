import app from './';
import mongoose from 'mongoose';

after(function(done) {
  app.bitelio.on('close', () => done());
  mongoose.connection.close();
  app.bitelio.close();
});
