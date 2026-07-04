const authService = require('../services/authService');
const RegisterDto = require('../dto/RegisterDto');

function AuthController()
  async register(req, res) {
    try {
      const registerDto = new RegisterDto(req.body);
      const user = await authService.register(registerDto);
      
      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: user
      });
    } catch (error) {
      const statusCode = error.message === 'Email already registered' ? 409 : 500;
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
  }
}

module.exports = new AuthController();
