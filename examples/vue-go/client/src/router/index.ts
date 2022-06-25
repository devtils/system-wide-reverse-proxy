import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminRootView from '../views/admin/RootView.vue'
import AdminManageProductsView from '../views/admin/ManageProductsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      name: 'Admin',
      path: '/admin',
      component: AdminRootView,
      children: [
        {
          name: 'AdminManageProducts',
          path: 'manage-products',
          component: AdminManageProductsView
        },
      ]
    }
  ]
})

export default router
