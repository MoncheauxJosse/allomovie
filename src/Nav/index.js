import React from 'react'
import './index.css'
import logo from './imageNav/FluxiVid.mp4'
import { Link } from 'react-router-dom'
//import item from'../imageIndex/BackgroundFluxi.png'

const Navigation = () =>{


    return(
    <div class="bg-yellow-300 flex flex-row gap-20">
            <Link to=""class="mx-2">Accueil </Link>
            <Link to="/favoris">Film Favoris</Link>
            <h2>Allo Movie</h2>
            
        </div>

    )


}

export default Navigation