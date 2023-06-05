import site from "./site/routes";
import auth from "./auth/routes";
import application from "./application/routes";

export default [...site, ...auth, ...application];
