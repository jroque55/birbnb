import express from 'express'
const router = express.Router();

export function healthRoutes() {
    router.get('/health', (req, res) => {
        res.status(200).json({
            status: 'OK',
        });
    });

    router.get('/detailed', (req, res) => {
        res.status(200).json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
        });
    }); 
    return router
}
export default router