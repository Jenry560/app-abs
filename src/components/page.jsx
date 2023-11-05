import {useState } from "react"
import Titulo from "./Titulo"
import Cronometro from "./Cronometro"
import Records from "./records"
import axios from "axios"
import Boton from "./boton"




export default function Page(){
    const [siguiente,setsiguiente] = useState(1)
    const [start,setStart]= useState(true)
    const [status,setStatus]= useState(false)

    
    const mesage = ["0",
    {eje1:"V sit",eje2: "(ojo mantener cuerpo estable y piernas levantadas)"},
    {eje1:"Laps con palmadas",eje2:"(manten la misma posicion haciendo palmadas)"},
    {eje1:"V sit giro de cadera",eje2:"(Misma postura con giro de cadera)"},
    {eje1:"Abs toque de tobillo",eje2:"(Presion en el core toca los tobillo)"},
    {eje1:"Elevacion de manos",eje2:"(Sube el core y trata de tocar tu pies)"},
    {eje1:"V sit con elevacion",eje2:"(Postura del v sit y levantamiendo de piernas)"},
    {eje1:"Crunch toque de pies",eje2:"(Eleva tu cadera y trata de tocar tus tobillo)"},
    {eje1:"Tijeras verticales",eje2:"(Presion en el core y pierna levantadas con movimientos verticales)"},
    {eje1:"Tijeras horizontales",eje2:"(Presion en el core y pierna levantadas con movimientos horizontales)"},
    {eje1:"Crunch elevacion",eje2:"(Manten postura relajada y eleva tu cadera lo mas que puedas)"}]
    const sources = `/media/eje${siguiente}.mp4`

    async function postRecord(data){
        try {
          const respuesta = await axios.post("https://servidor-abdominales.onrender.com/post",data)
        } catch (error) {
            console.error(error);   
        }
    }

    return(
        <>
        {siguiente < 11 ?
        (<div>
       
        {start ? (<Titulo setStart={setStart} start={start}/> ):(<>
         <video autoPlay loop muted key={siguiente}> 
            <source src={sources} type="video/mp4" />
        </video>
        <Cronometro siguiente={siguiente} setsiguiente={setsiguiente} status={status} setStatus={setStatus} mesage={mesage} postRecord={postRecord}/>
        <Boton/>
        </>)}
        </div>
        ):(<Records/>)}
        
        </>
    )
}