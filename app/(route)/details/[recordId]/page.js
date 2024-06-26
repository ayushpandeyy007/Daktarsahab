"use client"
import GlobalApi from '@/app/_utils/GlobalAPI'
import React,{useEffect, useState} from 'react'
import DoctorDetail from '../_components/DoctorDetail';

function Details({params}){
    const [doctor,setDoctor]=useState();
    useEffect(()=>{
      getDoctorById();
    },[])
    const getDoctorById=()=>{
    GlobalApi.getDoctorById(params.recordId).then(resp=>{
      setDoctor(resp.data.data);
    })
  }
  console.log(doctor, "doctorristhis");
  return (
    <div className='p-5 md:px-20'>
      <h2 className='font-bold text-[22px]'>Details</h2>
      <div className='grid grid-cols-1  md:grid-cols-4'>
        {/* Doctor Detail */}
        <div className=' cols-span-3 '>
        {doctor&& <DoctorDetail doctor={doctor}/>}
          
          </div>
           {/* Doctor Suggestion*/}
        </div>
          <div>

     
        </div>
      </div>
  
  )
}

export default Details