import { initialize } from "./router.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";
import { showCreate } from "./create.js";
import { showDashboard } from "./dashboard.js";
import { showHome } from "./home.js";
import { updateNav } from "./utils.js";
import { logout } from "../api/users.js";
import { showDetails } from "./details.js";

document.getElementById('views').remove();

const router = {
    '/': showHome,
    '/login': showLogin,
    '/register': showRegister,
    '/create': showCreate,
    '/dashboard': showDashboard,
    '/logout': logout,
    '/details': showDetails,
}



export const routes = initialize(router);

routes.goto('/');
updateNav();



