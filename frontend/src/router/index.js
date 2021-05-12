import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import User_Main from "@/components/user/Main";
import User_Main_Add from "@/components/user/main/Add";
import User_Main_Bikes from "@/components/user/main/Bikes";
import User_Main_Orders from "@/components/user/main/Orders";
import User_Main_Me from "@/components/user/main/me";
import User_Main_About from "@/components/user/main/About";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/user/main",
      name: "User_Main",
      component: User_Main,
      redirect: { name: "User_Main_Bikes" },
      children: [
        {
          name: "User_Main_Bikes",
          path: "bikes",
          component: User_Main_Bikes
        },
        {
          name: "User_Main_Add",
          path: "add",
          component: User_Main_Add
        },
        {
          name: "User_Main_Orders",
          path: "orders",
          component: User_Main_Orders
        },
        {
          name: "User_Main_Me",
          path: "me",
          component: User_Main_Me
        },
        {
          name: "User_Main_About",
          path: "about",
          component: User_Main_About
        }
      ]
    }
  ]
});
