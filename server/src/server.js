const app = require('./app/app');
const connectMysql = require('./libs/database/db');
const port = 4000;

app.listen(port, async () => {
  try {
    await connectMysql;
    console.log('connect mysql successfully');
    console.log(`Server express running http://localhost:${port}`);
  } catch (error) {
    console.log('err', error);
  }
});
