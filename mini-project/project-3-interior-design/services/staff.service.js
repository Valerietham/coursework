const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Staff } = require('../models');

const SECRET_KEY = 'password123';

module.exports = {
  async login(email, password) {
    const staff = await Staff.findOne({ where: { email, is_deleted: false } });
    if (!staff) {
      throw new Error('Staff not found');
    }

    const valid = await bcrypt.compare(password, staff.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    const payload = { id: staff.staff_id, role: staff.role };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    return {
      token,
      staff: {
        id: staff.staff_id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
      },
    };
  },
};
