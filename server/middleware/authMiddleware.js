import jwt from 'jsonwebtoken'

const protect = (req, res, next) => {
    const token = req.cookies?.jwt

    if (!token) {
        return res.status(401).json({ error: 'Not authenticated' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Token expired or invalid' })
    }
}

export default protect
