import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import ratelimit from "express-rate-limit";
import mongooseSanitize from "express-mongo-sanitize";
import globalErrorHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";
import companyRouter from "./routes/companyRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";


const app = express();

//security middleware
app.use(helmet());

app.use(
    cors({
        origin :["http://localhost:3000"],
        credentials:true,
    })
);


const limiter = ratelimit({
    windowMs:60 * 60 * 1000,  // 1hr
    max:10000,
    message:"Too many requets from this IP, Please try again an hour later",
    standardHeaders:true,
    legacyHeaders:false
});

app.use("/api", limiter);

if(process.env.NODE_ENV = "developnent"){
    app.use(morgan("dev"));
}
//for the data we receive from our front end
app.use(express.json({limit:"10kb"}));
app.use((req, res, next)=>{
    mongooseSanitize.sanitize(req.body)
    mongooseSanitize.sanitize(req.params);
    const queryCopy = { ...req.query};
    mongooseSanitize.sanitize(queryCopy);
    req.querySanitized = queryCopy
    next();
})
app.use("/api/v1/companies", companyRouter);
app.use("/api/v1/reviews", reviewRouter);

app.get("/", (req, res)=>{
    res.status(200).json({status:"success", message:"Just for testing"});
})

app.use((req, res, next)=>{
    next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
