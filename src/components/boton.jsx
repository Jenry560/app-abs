import { useState } from "react"
import useSound from 'use-sound';
import musica from "/media/cancion.mp3"

export default function Boton(){

    const[play,{pause}] = useSound(musica,{
        interrupt: false
    })
    const moti = new URL("/media/pain.jpg",import.meta.url)
    const[estado,setestado] = useState(false)
    
    const empezar =()=>{
        if (estado) {
            pause()
        }else{
            play()
        }
        setestado(!estado)
       
    }
    return(
       <div className="Nuevob"> 
        <img src={moti} alt="img" className={estado ? "img imgchange": "img"} onClick={empezar} />
       </div>
    )
}