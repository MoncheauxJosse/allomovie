import React, {useState,useEffect} from 'react'


const Favoris=()=>{

    const [dataFavoris, setDataFavoris] = useState({filmFavoris: []});
    const lienBase = `https://www.themoviedb.org/t/p/w220_and_h330_face/`


    const removeFavoris=(e)=>{

        let favorisremove =dataFavoris.filmFavoris

        favorisremove.splice(e.target.value,1)

        console.log(favorisremove)
            
            
        
        
        setDataFavoris({filmFavoris:favorisremove})
        localStorage.setItem('Fav',JSON.stringify(dataFavoris.filmFavoris))


    };

    useEffect(() => {

           
        async function fetchData() {
          
          
            
          const result = localStorage.getItem("Fav");

          const initialValue = JSON.parse(result);

          console.log(result)
       
          setDataFavoris({filmFavoris:initialValue});
           
        };
    
        fetchData();
    
      },[]);


      return(

        <div>Vos favoris

        <div  class="grid grid-cols-4 gap-4 ml-2"> 

           {dataFavoris.filmFavoris?.map((obj, index) => {
            return (

                <div id={index}  class="bg-gray-50 flex flex-row gap-2">
                <img src={lienBase+dataFavoris.filmFavoris[index].backdrop_path} alt={"img"+(index)} /> 
                <section class= "flex flex-col">
                    <div class=	"font-bold" >{dataFavoris.filmFavoris[index].title} </div>
                    <div className="texteDate" >{dataFavoris.filmFavoris[index].release_date} </div>

                    <section class= "flex flex-cols-1 gap-12 place-items-end h-56">

                    <button onClick={removeFavoris} value={index} class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">supprimer </button>
            
                    </section>

                </section>
        
                </div>
             )
       

            })}

        </div>

        </div>

        

      )



}
export default Favoris