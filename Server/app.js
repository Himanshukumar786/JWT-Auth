import express from 'express';

const app = express();

app.use('/', (req, res) => {
    res.status(200).json({Data: "jwt-auth- updated"});
});

export default app;