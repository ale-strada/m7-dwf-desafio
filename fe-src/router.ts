import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/mascotas", component: "mascotas-page" },
  { path: "/signup", component: "signup-page" },
  { path: "/login", component: "login-page" },
  { path: "/reportar", component: "report-page" },
  //{ path: "/editar", component: "edit-page" },
  {
    path: "/editar",
    component: "edit-page",
    action: async () => {
      await import("./pages/editar-mascota");
    },
  },
  //{ path: "/misMascotas", component: "mismascotas-page" },
  {
    path: "/misMascotas",
    component: "mismascotas-page",
    action: async () => {
      await import("./pages/mis-mascotas");
    },
  },
]);
