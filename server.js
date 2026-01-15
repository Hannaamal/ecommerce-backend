// server.js
import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import connectDB from './config/connectDB.js'
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import wishlistRouter from './routes/wishlistRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import userRouter from './routes/userRoutes.js';
import adminreportRouter from './routes/adminreportRoutes.js';
import customerProductRoutes from "./routes/customerProductRoutes.js";
import adminorderRouter from "./routes/adminorderRoute.js"




const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


connectDB()

app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000',
  'https://e-commerce-f3yijf6j4-amalhannas-projects.vercel.app',
  'https://e-commerce-2tjd043yp-amalhannas-projects.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.use('/uploads', express.static('uploads'));

app.use("/api/customer", customerProductRoutes);
app.use('/api/category',categoryRouter);
app.use('/api/auth',authRouter)
app.use('/api' ,productRouter);
app.use("/api/users", userRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/order', orderRouter);
app.use('/api/cart', cartRouter);
app.use('/api/admin',adminorderRouter)
app.use('/api/report',adminreportRouter)





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

