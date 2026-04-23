

import{

createRootRoute,
createRoute,
createRouter,
Link,
Outlet,
} from '@tanstack/react-router'

import SaludoWuipy from "./Components/SaludoWuipy";
import Quiz from "./Components/Quiz";
import BuscarPokemon from "./Components/BuscarPokemon";
import './App.css'
import { Component } from 'react';

const rootRoute = createRootRoute({
    component: function RootLayout(){
        return(
            <>
            <nav style={{ display: 'flex', gap: '1rem', padding: '1rem'}}>
                <Link to="/" activeProps= {{ style: { fontWeight: 'bold'}}}>
                Inicio
                </Link>
                <Link to="/Quiz" activeProps={{ style: { fontWeight: 'bold'}}}>
                Quiz
                </Link>
                <Link to="/Pokemon" activeProps={{ style: { fontWeight: 'bold'}}}>
                Pokemon
                </Link>
            </nav>

            <section id="center">
                <Outlet />
            </section>
            </>
        )
    },

    
})

const indexRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/',
   component: SaludoWuipy,
})

const QuizRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/Quiz',
    component: Quiz,
})

const PokemonRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/Pokemon',
    component: BuscarPokemon,
})

const routeTree = rootRoute.addChildren([indexRoute, QuizRoute, PokemonRoute])

export const router = createRouter({ routeTree})