import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import profile_pic from '../images/CharliePuth.png'
import Form from "../components/AppointmentForm"

export default function SpecificDentists() {
    return (<>
     <NavBar />
     <div className='flex flex-col justify-center items-center pb-20'>
        <div className='pb-20'>
            <div className='bg-dirty-blue w-screen h-48 flex flex-col justify-center items-center gap-5'>
                <div className='text-white text-6xl font-bold'>
                    Dr. Anh Nguyen
                </div>
                <div className='text-white text-5xl font-bold'>
                    Oral & Maxillofacial Surgeon
                </div>
            </div>
            <div className='flex flex-col justify-center items-center pt-20 gap-10'>
                <img src={profile_pic} alt=""/>
                <div className='w-[800px] flex flex-col gap-2' >
                    <p>Dr. Anh Nguyen graduated with honors from Loma Linda University School of Dentistry, where he was inducted into the national dental honor society Omicron Kappa Upsilon. He completed his oral and maxillofacial surgery residency at John Stroger Hospital of Cook County where he received extensive training in facial trauma, reconstruction and orthognathic surgery. He is well trained in outpatient anesthesia as well as complex dental implant procedures.</p>
                    <p>Also on staff at Advocate Lutheran General Hospital and an adjunct faculty member at Midwestern University College of Dental Medicine, Dr. Anh Nguyen enjoys bringing his best to every procedure and every patient. He also enjoys giving comprehensive support and treatment to make sure that everyone who sits in his chair can follow through with a healthy lifestyle.</p>
                    <p>Among Dr. Anh Nguyen’s accreditations are the American Heart Association in Advanced Cardiac Life Support, Pediatric Advanced Life Support and is also a certified Basic Life Support instructor for healthcare providers. He is also accredited by the American College of Surgeons in Advanced Trauma Life Support.</p>
                    <p>Outside the office, Dr. Anh Nguyen enjoys exploring different cultures and cuisine by traveling and is a self-described “avid foodie.” He also cherishes the opportunity to serve others internationally as he has traveled to South America and Asia for mission work on numerous occasions.</p>
                </div>
            </div>
            
            
        </div>
        <Form />
     </div>
     <Footer />
    </>)
}