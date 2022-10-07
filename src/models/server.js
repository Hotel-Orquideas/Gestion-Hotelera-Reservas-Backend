const express = require('express');
const cors = require('cors');

class Server {
	constructor() {
		this.app = express();
		this.port = 3005;
		this.pathEmployee = '/management/api/employee';
		this.middleware();
		this.routes();
	}

	middleware() {
		this.app.use(express.json());
		this.app.use(cors());
	}

	routes() {
		this.app.use(this.pathEmployee, require('../routes/employee-route'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server listening on port ${this.port}`);
		});
	}
}

module.exports = Server;
