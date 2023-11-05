import { useState } from "react"

export default function Modal({record,name}){
    return(
        <>
        <div className="Modal">
         <div className="Modal-container">
          <p>Felicidades {name.nombre} tu record es {record.m1} minuto con {record.s1} Segundo</p>
         </div>
        </div>
        </>
    )
}