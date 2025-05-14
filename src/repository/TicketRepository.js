const Ticket = require('../models/Ticket');

class TicketRepository {
  async create(ticketData) {
    const ticket = new Ticket(ticketData);
    return await ticket.save();
  }

  async findById(id) {
    return await Ticket.findById(id);
  }

  async findAll() {
    return await Ticket.find();
  }
}

module.exports = new TicketRepository();