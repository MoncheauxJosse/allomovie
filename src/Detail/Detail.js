import React, {useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { getDetail,getCarroucel } from '../service/Connect'


const Detail = (Props)=>{

    const location= useLocation()


    const lienBase = `https://www.themoviedb.org/t/p/w220_and_h330_face/`

    const [dataDetail, setDataDetail] = useState({filmDetail: {}});
    const [caroucel,setCaroucel]= useState({filmCaroucel:{}})
    const [favoris, setFavoris] = useState({filmFavoris: []});



    const clickDetailFavoris=(e)=>{


        console.log( "click")
        let result = caroucel.filmCaroucel

       let recuperation = result.filter(result => result.id == e.target.value);

       console.log(recuperation[0])

            
            setFavoris({filmFavoris:[...favoris.filmFavoris,recuperation[0]]})
            localStorage.setItem('Fav',JSON.stringify(favoris.filmFavoris))
    

    };

   
    useEffect(() => {

           
        async function fetchData() {
          
          const result = await getDetail(location.state.id)
          let resultCaroucel = await getCarroucel()

          const resultStorage = localStorage.getItem("Fav");
          const initialValue = JSON.parse(resultStorage);

          
       
          setFavoris({filmFavoris:initialValue});
          setDataDetail({filmDetail:result.data});
          setCaroucel({filmCaroucel:resultCaroucel.data.results})
           
        };
    
        fetchData();
    
      },[]);


            return (

                <div class="flex flex-row gap-2 mt-2 mx-2">
                    
                    <img class="object-cover bg-h-full w-1/3 "src={lienBase+dataDetail.filmDetail.poster_path} alt={"img"+(dataDetail.filmDetail.id)} /> 
                     
                    <div class="bg-gray-50 max-w-6xl mt-2">

                        <div  class="flex flex-row gap-3">

                            <section class="mx-2">

                                <div class=	"font-bold  text-center text-8xl" >{dataDetail.filmDetail.title} </div>

                                <div class="mt-4 text-2xl">{dataDetail.filmDetail.overview} </div>

                                <button onClick={clickDetailFavoris} value={dataDetail.filmDetail.id}class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-5 w-full" >Add Favoris</button>

                                <div class=	"font-bold mt-4 text-2xl">date de sortie :</div>

                                <div class="text-2xl">{dataDetail.filmDetail.release_date}</div>

                                <div class=	"font-bold mt-4 text-2xl">Genres:</div>

                                <div class = "flex flex-cols-1 gap-3">

                                    {dataDetail.filmDetail.genres?.map((obj, index) => {
                                    return (

                                            <div id={index}>
                                                <div class="text-2xl"> {dataDetail.filmDetail.genres[index].name}</div>
                                                
                                            </div>
                                        )
                                    })}

                                </div>

                                <div class="font-bold mt-4 text-2xl">Note Général :</div>

                                <div class="text-2xl"> {dataDetail.filmDetail.vote_average}</div>

                            </section>

                        </div>

                        

                        <div class="font-bold mx-2 text-2xl">Productions :</div>


                        <div class = "flex flex-cols-1 gap-3 ml-2 items-center">

                            {dataDetail.filmDetail.production_companies?.map((obj, index) => {
                                return (

                                    <div id={index}>
                                        <img class="rounded-full" src={lienBase+dataDetail.filmDetail.production_companies[index].logo_path} alt={"img"+(index)}/>
                                    </div>
                                )
                            })}

                        </div>

                    </div>
                </div>
            
            
            )
}

export default Detail 