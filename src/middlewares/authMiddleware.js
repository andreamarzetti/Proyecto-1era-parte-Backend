exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    next();
  };
  
  exports.isUser = (req, res, next) => {
    if (req.user.role !== 'user') {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    next();
  };