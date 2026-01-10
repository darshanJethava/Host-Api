import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import orderRoutes from "./routes/order.routes.js";
import measurementRoutes from "./routes/measurement.routes.js";
import invoiceRoutes from "./routes/invoice.routes.js";
import workerRoutes from "./routes/worker.routes.js";
import shopRoutes from "./routes/shop.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/measurements", measurementRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/shops", shopRoutes);


export default app;
