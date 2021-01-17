import app from './app';
import db from './db';

async function init(): Promise<void> {
  await db.connect();
  const port = process.env.PORT || 4000;
  return new Promise<void>((resolve) => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
      resolve();
    });
  });
}

export default init;
