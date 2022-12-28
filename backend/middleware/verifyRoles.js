const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.status(403).json({ msg: 'No roles provided' }); // Forbidden
        const rolesArray = [...allowedRoles]; // Convert roles to array
        const result = req.roles.map(role => rolesArray.includes(role)).find(role => role === true); // Check if user has any of the roles
        if (!result) return res.sendStatus(401); // Unauthorized
        next(); // Continue
    }
}

module.exports = verifyRoles;