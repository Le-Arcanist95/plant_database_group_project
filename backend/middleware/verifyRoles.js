const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.status(403).json({ msg: 'No roles provided' });
        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(role => role === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles;