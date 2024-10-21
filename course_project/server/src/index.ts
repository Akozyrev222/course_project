import express from 'express';
import authRoutes from './routes/auth';
import sequelize from './config/database';
import setupAssociations from "./models/associations";
import templateRoutes from "./routes/templateRoutes";
import tagsRoutes from "./routes/tagsRoutes";

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/tags', tagsRoutes);

setupAssociations();

sequelize.sync().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
