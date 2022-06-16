import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AssetScreen from "@/views/Asset/Asset.vue";
import FacilityScreen from "@/views/Facility/Facility.vue";
import ManufacturerScreen from "@/views/Manufacturer/Manufacturer.vue";
import ModelScreen from "@/views/Model/Model.vue";
import VendorScreen from "@/views/Vendor/Vendor.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/asset",
      name: "Asset",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AssetScreen,
    },
    {
      path: "/facility",
      name: "Facility",
      component: FacilityScreen,
    },
    {
      path: "/manufacturer",
      name: "Manufacturer",
      component: ManufacturerScreen,
    },
    {
      path: "/model",
      name: "Model",
      component: ModelScreen,
    },
    {
      path: "/vendor",
      name: "Vendor",
      component: VendorScreen,
    },
  ],
});

export default router;
