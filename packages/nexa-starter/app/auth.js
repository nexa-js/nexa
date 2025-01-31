export const AuthMiddleware = (app, apiToken) => {
    app.use((req, res, next) => {
        if (req.headers['authorization']) {
            const token = req.headers['authorization'].split(' ')[1];
            if (token === apiToken) {
                return next();
            }
        }
        res.status(401).send('Unauthorized');
    });
}