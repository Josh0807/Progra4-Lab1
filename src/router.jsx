import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import RootLayout from './components/RootLayout'
import Home from './pages/Home'
import CarParts from './pages/CarParts'

const rootRoute = createRootRoute({
  component: RootLayout,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const carPartsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/repuestos',
  component: CarParts,
})

const routeTree = rootRoute.addChildren([homeRoute, carPartsRoute])

export const router = createRouter({
  routeTree,
})
