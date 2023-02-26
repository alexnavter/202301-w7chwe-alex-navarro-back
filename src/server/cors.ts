import "../loadEnvironment";
import type cors from "cors";

const apiUrl = process.env.API_URL!;

const allowedOrigins = ["http://localhost:4000", `${apiUrl}`];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export default options;
