'use strict';

module.exports = (role) => {

    return (req, res, next) => {
        try {
            if (req.users.role.includes(role)) {
                next();
            }
            else {
                next('Access Denied');
            }
        } catch (e) {
            next('Invalid Login lol', e);
        }
    }
}