import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import { register } from "./controllers/auth.js"
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { verifyToken } from "./middleware/auth.js";
import { expressCspHeader, INLINE, NONE, SELF } from "express-csp-header"
import User from "./models/User.js";
import { users } from "./data/index.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(expressCspHeader({ 
    policies: { 
        'default-src': [expressCspHeader.NONE], 
        'img-src': [expressCspHeader.SELF], 
    } 
}));  
app.use(
    helmet.contentSecurityPolicy({
      useDefaults: false,
      "block-all-mixed-content": true,
      "upgrade-insecure-requests": true,
      directives: {
        "default-src": [
            "'self'"
        ],
        "base-uri": "'self'",
        "font-src": [
            "'self'",
            "https:",
            "data:"
        ],
        "frame-ancestors": [
            "'self'"
        ],
        "img-src": [
            "'self'",
            "data:"
        ],
        "object-src": [
            "'none'"
        ],
        "script-src": [
            "'self'",
            "https://cdnjs.cloudflare.com"
        ],
        "script-src-attr": "'none'",
        "style-src": [
            "'self'",
            "https://cdnjs.cloudflare.com"
        ],
      },
    }),
    helmet.dnsPrefetchControl({
        allow: true
    }),
    helmet.frameguard({
        action: "deny"
    }),
    helmet.hidePoweredBy(),
    helmet.hsts({
        maxAge: 123456,
        includeSubDomains: false
    }),
    helmet.ieNoOpen(),
    helmet.noSniff(),
    helmet.referrerPolicy({
        policy: [ "origin", "unsafe-url" ]
    }),
    helmet.xssFilter()
)


/* ROUTES WITH FILES */
app.post("/auth/register", register);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => {
	app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

	/* ADD DATA ONE TIME */
	// User.insertMany(users);
	// Post.insertMany(posts);
})
.catch((error) => console.log(`${error} did not connect`));