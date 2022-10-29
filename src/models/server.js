const express = require('express');
const cors = require('cors');

class Server {
	constructor() {
		this.app = express();
		this.port = 3005;
		this.pathAuth = '/management/api/auth';
		this.pathEmployee = '/management/api/employee';
		this.pathCompanies = '/management/api/company';
		this.pathServices = '/management/api/service';
		this.pathRoomType = '/management/api/roomType';
		this.pathRate = '/management/api/rate';
		this.middleware();
		this.routes();
	}

	middleware() {
		this.app.use(express.json());
		this.app.use(cors());
	}

	routes() {
		this.app.use(this.pathAuth, require('../routes/auth-route'));
		this.app.use(this.pathEmployee, require('../routes/employee-route'));
		this.app.use(this.pathCompanies, require('../routes/company-route'));
		this.app.use(this.pathServices, require('../routes/service-route'));
		this.app.use(this.pathRoomType, require('../routes/room-types-route'));
		this.app.use(this.pathRate, require('../routes/rate-route'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server listening on port ${this.port}`);
		});
	}
}

module.exports = Server;
