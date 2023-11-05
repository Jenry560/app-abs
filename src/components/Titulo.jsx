import React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"




function Titulo ({setStart}){
        const {register,handleSubmit,formState:{errors}}= useForm()
        const formu = document.getElementsByClassName("form")
        const [user,setuser] = useState(JSON.parse(localStorage.getItem('nombre')))


        function onSubmit(data){  
            console.log(data)
            localStorage.setItem('nombre',JSON.stringify(data))
            formu[0].reset()
            setuser(data)   
        }
       function comenzar(){
         setStart(false)
       }


    return(
        <>
        <div>
        <h2 className="abs">Rutina de absdominales de 5min (Intensa)</h2>
        {user  ? ( <button className="boton-x" onClick={comenzar}>Comienza {user.nombre}</button>):(
             <form onSubmit={handleSubmit(onSubmit)} className="form">
             <input type="text" placeholder="Escriba su nombre" {...register('nombre',{ required: true })}/>
             <input type="submit" value={"Iniciar"}/>
         </form>)
        }
        </div>
       
        </>
    )
}

export default Titulo