import React, {useState,useEffect} from 'react'
import { getCarroucel, getFilter, getRecherche } from '../service/Connect';
import {  useNavigate } from "react-router-dom"


const Corps = () =>{


    const [filter, setFilter] = useState({choix: ""}); 
    const [data, setData] = useState({film: []});
    const [favoris, setFavoris] = useState({filmFavoris: []});
    const [favorisRecupe, setFavorisRecupe] = useState({filmFavoris: []});
    const [ajouterfav, setAjouterfav] = useState({ajout: false});
    const [recherche, setRecherche] = useState('');
    const lienBase = `https://www.themoviedb.org/t/p/w220_and_h330_face/`
    const [page, setPage] = useState(1);
    const [pagetotal, setPageTotal] = useState(1);
    const navigate= useNavigate()



    const AvancerPage=()=>{

        setPage(page+1)

        console.log(page)

    }
    
    const reculerPage=()=>{

        if(page!==1){

            setPage(page-1)
        }
        
        
    }
    
    
    const click=(e)=>{

        navigate("/Detail",{
            state:{
                id:e.target.value
            },
        });

    };





    const clickFavoris=(e)=>{

        let favorisClick =data.film[e.target.value]

        console.log(favorisClick.id)

        let double

         favorisRecupe.filmFavoris.forEach(object =>{
            if(object.id === favorisClick.id){
                

                double =true;
                
            }});

            if(double!==true){


                console.log("sa passe");

                setFavoris({filmFavoris:[...favorisRecupe.filmFavoris,favorisClick]})    
                setAjouterfav({ajout: true})   
                
            }

            double =false;
            
    };
    




    const handleInputChange = (e) => {
        setRecherche(e.target.value);
        console.log("input ; "+e.target.value)
    }


        const handleChange = (e) => {

            console.log("selecrt active")
            setFilter({choix: e.target.value})
            setPage(1)

          }




          useEffect(() => {        
            
            async function fetchData() {

                const resultrecup = localStorage.getItem("Fav");

        const initialValue = JSON.parse(resultrecup );

        setFavorisRecupe({filmFavoris:initialValue});

        if(ajouterfav.ajout===true){

            localStorage.setItem('Fav',JSON.stringify(favoris.filmFavoris))
            setAjouterfav({ajout: false})
        }
       
      
              
                let result

                if(recherche ===''){
                    if(filter.choix===""){

                        console.log("pas de choix")
                result = await getCarroucel(page)
                    }else if(filter.choix!==""){
    
                        
                        
                        result = await getFilter(filter.choix,page)
    
                        console.log("choix fait: "+filter.choix)
    
                    }
                }else if(recherche !==''){

                    result = await getRecherche(recherche,page)


                }
               
           
            setData({film:result.data.results});
            setPageTotal(result.data.total_pages)
               
            };
        
            fetchData();
        
          },[filter.choix,favoris,ajouterfav,page,recherche]);

    

    return (
        
        <div className="color"> Filtre : 
        
        <select onChange={(e) => handleChange(e)}>
        <option value="">Recommandé</option>
    		<option value="28">Action</option>
    		<option value="12">Aventure</option>
    		<option value="16">Animation</option>
    		<option value="35">Comedie</option>
            <option value="80">Action</option>
    		<option value="99">Aventure</option>
    		<option value="10751">Animation</option>
    		<option value="14">Comedie</option>
            <option value="36">Action</option>
    		<option value="27">Aventure</option>
    		<option value="10402">Animation</option>
    		<option value="9648">Comedie</option>
            <option value="10749">Action</option>
    		<option value="878">Aventure</option>
    		<option value="10770">Animation</option>
    		<option value="53">Comedie</option>
            <option value="10752">Aventure</option>
    		<option value="37">Animation</option>
   		</select>

           <input type="text" id="recherche" name="recherche" placeholder="rechercher film..." value={recherche} onChange={handleInputChange} />

        <section  class="grid grid-cols-4 gap-4 ml-2">
           {data.film?.map((obj, index) => {
            return (

                <div key={index}  class="bg-gray-50 flex flex-row gap-2">
                <img src={lienBase+data.film[index].backdrop_path} alt={"img"+(index)} /> 
                <section class= "flex flex-col">
                    <div class=	"font-bold" >{data.film[index].title} </div>
                    <div className="texteDate" >{data.film[index].release_date} </div>

                    <section class= "flex flex-cols-1 gap-12 place-items-end h-56">
                
                    <button onClick={click} value={data.film[index].id} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Détail</button>

                    <button onClick={clickFavoris} value={index} class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Favoris</button>                

                    </section>

                </section>
        
                </div>
             )
       

            })}

        </section>

        <section class="flex items-center justify-center">
    
            <button onClick={reculerPage} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >-</button>
            <div class="font-bold text-center text-2xl mx-2"> Pages {page} /{pagetotal} </div>
            <button onClick={AvancerPage} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >+</button>


        </section>
        
        </div>
        

    )
}

export default Corps