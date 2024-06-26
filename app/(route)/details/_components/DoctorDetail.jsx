import { Button } from '@/components/ui/button';
import { GraduationCap, MapPin } from 'lucide-react'; // Importing icons from lucide-react
import Image from 'next/image';
import React from 'react';
import BookAppointment from './BookAppointment';

function DoctorDetail({ doctor }) {
  const socialMediaList = [
    {
      id: 1,
      icon: '/fb.png', // Corrected path for Facebook icon
      url: ''
    },
    {
      id: 2,
      icon: '/insta.png', // Corrected path for Instagram icon
      url: ''
    },
    {
      id: 3,
      icon: '/whatsapp.png', // Corrected path for WhatsApp icon
      url: ''
    }
  ];

  console.log(doctor.attributes?.Name, "this is name of the doctor");

  return (
    <>
    <div className='col-span-3 grid grid-cols-1 md:grid-cols-3 border-[2px] p-5 mt-5 rounded-lg'>
      {/* Doctor Image */}
      <div>
        <Image
          src={doctor?.attributes?.image?.data?.attributes?.url}
          width={200}
          height={200}
          alt='doctor-image'
          className='rounded-lg h-[280px] object-cover'
        />
      </div>
      {/* Doctor Information */}
      <div className='col-span-2 mt-5 px-10 md:flex-col gap-3 items-baseline'>
        <h2 className='font-bold text-2xl'>{doctor.attributes?.Name}</h2>
        <div className='flex gap-2 text-gray-500 text-md'>
          <GraduationCap />
          <span>{doctor.attributes?.Year_of_Experience} years of Experience</span>
        </div>
        <div className='text-md flex gap-2 text-gray-500'>
          <MapPin />
          <span>{doctor.attributes?.Address}</span>
        </div>
        <div className="text-[15px] bg-blue-100 p-1 rounded-full px-2 text-primary">
          {doctor?.attributes?.categories?.data[0]?.attributes?.Name} 
          <div className='flex gap-3'>
            {socialMediaList.map((item, index) => (
              <Image
              src={item.icon}
                key={index}
                width={30}
                height={30}
              />
            ))}
          </div>
         
        </div>
<BookAppointment/>
      </div>
      
    </div>
    <div>
        <div className='p-3 border-[1px] rounded-lg mt-5'>
    <h2 classname='font-bold text-[20px]'>About Me</h2>
    <p className='text-gray-500 tracking-wide mt-2'>{doctor.attributes.About}</p>
    </div>
    </div>
    </>
    
  );
}

export default DoctorDetail;
