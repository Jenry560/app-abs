import axios from "axios";
import {useEffect, useState } from "react";


export default function Records (){
    const [datos,Setdatos] = useState([])
    let lugar = 1
    const medalla = new URL("/media/medallas.png",import.meta.url)
    const medalla2 = new URL("/media/medalla2.png",import.meta.url)

    async function getRecord(){
        try {
          const respuesta = await axios.get("https://servidor-abdominales.onrender.com/get")
        Setdatos(respuesta.data)
        } catch (error) {
            console.error(error);   
        }
    }
    useEffect(()=>{
        getRecord()
    },[])

    function space(){
       let nuevo = lugar++
        if (nuevo === 1) {
            return <img src={medalla} style={{width:"30px"}}/>
        }
        else if(nuevo === 2){
            return <img src={medalla2} style={{width:"90px"}}/>
        }
        return nuevo
    }
    return(
        <div className="records">
        <p className="title-record">Records</p>
        <table>
            <thead>
                <tr>
                    <th>Lugar</th>
                    <th>Nombre</th>
                    <th>Record</th>
                </tr>

            </thead>
            <tbody>
           {datos.map((dar)=>
             <tr key={dar._id}>
                 <th  >{space()}</th>
                 <td>{dar.nombre}</td>
                 <td>{dar.recordX}</td>
             </tr>
             
           )}
        </tbody>
        </table>
        </div>
    )
}