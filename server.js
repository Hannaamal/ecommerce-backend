// server.js
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js'
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import wishlistRouter from './routes/wishlistRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import userRouter from './routes/userRoutes.js';


dotenv.config();
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


connectDB()

app.use(express.json());

app.use(cors({
 origin: 'http://localhost:3000', // allow your frontend
  credentials: true,               // allow cookies/auth headers
}));

app.use('/uploads', express.static('uploads'));

app.use('/api/category',categoryRouter);
app.use('/api/auth',authRouter)
app.use('/api' ,productRouter);
app.use("/api/users", userRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/orders', orderRouter);
app.use('/api/cart', cartRouter);


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.disable("etag"); 

app.use((error,req, res,next) => {
    res.status(error.code || 500).json({
        message: error.message || "An unknown error occurred",
    });
});

app.listen(process.env.PORT, () => {
    console.log(`server running at http://localhost:${process.env.PORT}`);
})

