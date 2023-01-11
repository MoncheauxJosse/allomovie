import axios from "axios"


export const getCarroucel = async (page) => {


    return await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=33cbae8fdacddbcf84ed15af399cf394&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page='+page+'&with_watch_monetization_types=flatrate')
}

export const getFilter = async (choix,page) => {


    return await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=33cbae8fdacddbcf84ed15af399cf394&with_genres='+choix+'&page='+page)
}

export const getDetail = async (id) => {


    return await axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key=33cbae8fdacddbcf84ed15af399cf394&language=fr')
}

export const getRecherche = async (nom,page) => {


    return await axios.get('https://api.themoviedb.org/3/search/movie?api_key=33cbae8fdacddbcf84ed15af399cf394&language=fr&page='+page+'&include_adult=false&query='+nom)
}
