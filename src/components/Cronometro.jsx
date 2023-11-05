
import React, { useState,useEffect } from 'react'
import '../App.css'
import sonido from "/media/sound.wav"
import useSound from 'use-sound';
import Modal from './modal';

function Cronometro({status,setStatus,setsiguiente,siguiente,mesage,postRecord}) {
  
  const [name,setName]=useState(JSON.parse(localStorage.getItem("nombre")))
  const [play] = useSound(sonido)
  const [cronometro,setCronometro] = useState({ms:0,s:0,m:0})
  const [cronometro1,setCronometro1] = useState({ms1:0,s1:0,m1:0})
  const [corriendo,setCorriendo] = useState(true)
  const [interv,setInterv]= useState(0)
  const [record,setRecord]= useState(true)
  const [reVisi,setReVisi] = useState(false)
  const [mensaje,setMensaje] = useState(false)
  const [pon,setpon]= useState(false)
  

  let value = 0
  var UpdateMs = cronometro.ms, UpdateS = cronometro.s, UpdateMt= cronometro.m
  var UpdateMs1 = cronometro1.ms1, UpdateS1 = cronometro1.s1, UpdateMt1= cronometro1.m1
 

  
  const start =()=>{
    setCorriendo(false)
    setInterv(setInterval(run,10))
    if(value === 0){
        value++
        setInterval(run1,10)
    }
  }
  
  const stop =()=>{
    if(record){
        setReVisi(true)
        setRecord(cronometro1)
        const data = { 
          nombre: name.nombre,
          recordX: `${cronometro1.m1}:${cronometro1.s1}`
         }
         postRecord(data)
        setTimeout(()=>{
            setReVisi(false)
            setRecord(false)
        },3000)
        
    }
    setCorriendo(true)
    clearInterval(interv)
  }

  //Cronometro que lleva los 30 minutos
  const run=()=>{
  
    if(UpdateS === 60){
      UpdateMt++
      UpdateS = 0
    }
    if(UpdateMs === 100){
      UpdateS++
      UpdateMs = 0
    }
    
    UpdateMs++
    return setCronometro({ms: UpdateMs ,s: UpdateS,m: UpdateMt})
  }


 useEffect(()=>{
    if((cronometro.s === 30 && cronometro.ms === 1)) {
     setMensaje(true)
     setCorriendo(true)   
     clearInterval(interv)
     setCronometro({ms:0,s:0,m:0})
     setpon(true)
     setsiguiente(siguiente + 1)
     if(siguiente === 10  && record){
      console.log("se acabo")
      stop()
     }
    }
    if((cronometro.s === 27 && cronometro.ms === 1) || (cronometro.s === 28 && cronometro.ms === 1) || (cronometro.s === 29 && cronometro.ms === 1)) {
         play()
       }

},[cronometro])

  useEffect(()=>{
       if(pon){
        setTimeout(() => {
            setMensaje(false)
            start()
            setpon(false)
        }, 3000);
       }
       
  },[pon])



   //Cronometro que lleva los 5 minutos
  const run1=()=>{
  
    if(UpdateS1 === 60){
      UpdateMt1++
      UpdateS1 = 0
    }
    if(UpdateMs1 === 100){
      UpdateS1++
      UpdateMs1 = 0
    }
    
    UpdateMs1++
    return setCronometro1({ms1: UpdateMs1 ,s1: UpdateS1,m1: UpdateMt1})
  }
 
  useEffect(()=>{
    if(status){
      start()
    }
  },[status])
  
  setTimeout(() => {
    setStatus(true)  
  }, 2000);

  



  return (
    <>
      <div className='Cronometro'>   
      {mensaje && <p className='preparate'>Preparate para el siguiente ejercicio</p>} 
      <h1>{mesage[siguiente].eje1}</h1> 
      <p>{mesage[siguiente].eje2}</p>
      {reVisi && <Modal record={record} name={name}/>}
 
      <h1>{`${cronometro.s}:${cronometro.ms}`}</h1>
      {!pon && (corriendo ? (<button onClick={start} className={status ? "boton": "botonNow"} >Start</button>):(<button onClick={stop}  className='boton' >Stop</button>))   }
      </div> 
    </>
  )
}
export default React.memo(Cronometro)
