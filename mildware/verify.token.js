import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT, (err, decoded) => {
        if(err) {
            return res.status(403).json({ message: 'Invalid access token' });
        }
        req.user = decoded;
        console.log("decoded", decoded)
            next();
        });
    };

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).json({ message: 'Access denied' });
        }
    });
}

export const verifyAdminorManager = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.role === 'admin' || req.user.role === 'manager') {
            next();
        } else {
            return res.status(401).json({ message: 'Access denied' });
        }
    });
}

export const verifyaAll = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.role === 'admin' || req.user.role === 'manager' || req.user.role === 'user') {
            next();
        } else {
            return res.status(401).json({ message: 'Access denied' });
        }
    });
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.role === 'user') {
            next();
        } else {
            return res.status(401).json({ message: 'Access denied' });
        }
    });
}


