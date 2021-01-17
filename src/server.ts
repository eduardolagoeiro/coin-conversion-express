import app from './app';

function init(): void {
  app.listen(process.env.PORT || 4000);
}

export default init;
