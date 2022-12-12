require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { env, config } = require('process');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT || "8080";
		this.pathAuth = '/management/api/auth';
		this.pathEmployee = '/management/api/employee';
		this.pathCompanies = '/management/api/company';
		this.pathServices = '/management/api/service';
		this.pathRoomType = '/management/api/roomType';
		this.pathRate = '/management/api/rate';
		this.pathRoom = '/management/api/room';
		this.pathPromotion = '/management/api/promotion';
		this.pathClient = '/management/api/client';
		this.pathClientCompany = '/management/api/clientCompany';
		this.pathBooking = '/management/api/booking';
		this.pathPaymentMethod = '/management/api/paymentMethod';
		this.pathBookingClients = '/management/api/bookingClient';
		this.pathBookingRooms = '/management/api/bookingRoom';
		this.pathBills = '/management/api/bill';
		this.pathBillDetails = '/management/api/billDetail';
		this.pathPaymentHistory = '/management/api/paymentHistory';
		this.pathRoomServices = '/management/api/roomService';
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
		this.app.use(this.pathRoom, require('../routes/room-route'));
		this.app.use(this.pathPromotion, require('../routes/promotion-route'));
		this.app.use(this.pathClient, require('../routes/client-route'));
		this.app.use(this.pathClientCompany, require('../routes/client-company-route'));
		this.app.use(this.pathBooking, require('../routes/booking-route'));
		this.app.use(this.pathPaymentMethod, require('../routes/payment-method-route'));
		this.app.use(this.pathBookingClients, require('../routes/booking-client-route'));
		this.app.use(this.pathBookingRooms, require('../routes/booking-room-route'));
		this.app.use(this.pathBills, require('../routes/bill-route'));
		this.app.use(this.pathBillDetails, require('../routes/bill-detail-route'));
		this.app.use(this.pathPaymentHistory, require('../routes/payment-history-route'));
		this.app.use(this.pathRoomServices, require('../routes/room-service-route'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server listening on port ${this.port}`);
		});
	}
}

module.exports = Server;
