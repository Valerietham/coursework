const UserService = require('../services/staff.service');

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const data = await UserService.login(email, password);
      res.json(data);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },
};
