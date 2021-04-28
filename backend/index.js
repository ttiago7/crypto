const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Constants
const PORT = 3001;
const HOST = '0.0.0.0';

conn.sync({ force: true }).then(() => {
	server.listen(PORT, HOST, () => {
		console.log(`%s listening at http://${HOST}:${PORT}`); // eslint-disable-line no-console
	});
});

// // Syncing all the models at once.
// conn.sync({ force: false }).then(() => {
// 	server.listen(3001, () => {
// 		console.log('%s listening at 3001'); // eslint-disable-line no-console
// 	});
// });
