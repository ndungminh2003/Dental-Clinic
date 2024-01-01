import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function DentalRecords() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const recordContainers = document.querySelectorAll('.record-container');
    let matchFound = false;

    recordContainers.forEach((container) => {
      const recordText = container.textContent.toLowerCase();

      if (recordText.includes(query)) {
        container.style.display = 'flex';
        matchFound = true;
      } else {
        container.style.display = 'none';
      }
    });

    const noMatchMessage = document.getElementById('no-match-message');
    if (matchFound) {
      noMatchMessage.style.display = 'none';
    } else {
      noMatchMessage.style.display = 'block';
    }
  };
      
    return ( <>
    <NavBar />
    <div className='flex flex-col pl-40 pr-20 pb-16'>
        <div className="flex items-center">
            <div className="w-full max-w-3xl mx-auto pt-10">
            <h2 className="text-center text-6xl font-extrabold pb-10">MY DENTAL RECORDS</h2>
            </div>
        </div>
        <div className='flex flex-col gap-6'>
            <div>
                <h3 className='font-extrabold text-4xl'>Welcome to My Dental Records!</h3>
                <div className='text-2xl'>Here, you can easily review your dental treatment history and procedures. This dental records provides detailed information about past treatments, enabling you to  maintain better oral health.</div>
                <br></br>
                <div className=' text-2xl'>Let's begin exploring your Dental Records and learn more about your dental health!</div>
            </div>
            <input
          type="search"
          placeholder="Search for dental records..."
          className="h-12 w-11/12 rounded-xl border-2 border-solid border-black text-2xl pl-10"
          value={searchQuery}
          onChange={handleSearch}
        />
        </div>
       
        <div className='flex flex-col items-start pl-40 h-[600px] w-11/12 overflow-y-scroll shadow-xl rounded-2xl pt-10'>
            <div className=' flex flex-row gap-20 pb-6'>
                <div className='border-2 border-solid border-black rounded-xl w-[500px] pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center record-container'>
                    <div className='font-bold text-4xl'>
                        TOOTH DECAY
                    </div>
                    <div className='flex flex-col gap-5 text-2xl'>
                        <div className='flex flex-row gap-2 '>
                            <div className='font-bold'> Date of visit:</div>
                            <div>20/10/2023</div>
                        </div>
                        <div className='flex flex-row gap-2 '>
                            <div className="font-bold">Service:</div>
                            <div>Tooth Extraction</div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="font-bold">Dentist:</div>
                            <div>Dr.Anh Nguyen</div>
                        </div>
                    </div>
                    <button className='text-blue-hosta hover:underline text-xl flex flex-row justify-end pr-10'><Link to= "/prescriptions">View details  &#8250;</Link></button>
                </div>
            
                <div className='border-2 border-solid border-black rounded-xl w-[500px] pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center record-container'>
                    <div className='font-bold text-4xl'>
                        TOOTH DECAY
                    </div>
                    <div className='flex flex-col gap-5 text-2xl'>
                        <div className='flex flex-row gap-2 '>
                            <div className='font-bold'> Date of visit:</div>
                            <div>20/10/2023</div>
                        </div>
                        <div className='flex flex-row gap-2 '>
                            <div className="font-bold">Service:</div>
                            <div>Tooth Extraction</div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="font-bold">Dentist:</div>
                            <div>Dr.Anh Nguyen</div>
                        </div>
                    </div>
                    <button className='text-blue-hosta hover:underline text-xl flex flex-row justify-end pr-10'><Link to= "/prescriptions">View details  &#8250;</Link></button>
                </div>
            </div>
            <div className=' flex flex-row gap-20 pb-6'>
                <div className='border-2 border-solid border-black rounded-xl w-[500px] pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center record-container'>
                    <div className='font-bold text-4xl'>
                        GINGIVITIS
                    </div>
                    <div className='flex flex-col gap-5 text-2xl'>
                        <div className='flex flex-row gap-2 '>
                            <div className='font-bold'> Date of visit:</div>
                            <div>20/10/2023</div>
                        </div>
                        <div className='flex flex-row gap-2 '>
                            <div className="font-bold">Service:</div>
                            <div>Tooth Extraction</div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="font-bold">Dentist:</div>
                            <div>Dr.Khanh Nguyen</div>
                        </div>
                    </div>
                    <button className='text-blue-hosta hover:underline text-xl flex flex-row justify-end pr-10'><Link to= "/prescriptions">View details  &#8250;</Link></button>
                </div>
            
                <div className='border-2 border-solid border-black rounded-xl w-[500px] pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center record-container'>
                    <div className='font-bold text-4xl'>
                        ORAL CANCER
                    </div>
                    <div className='flex flex-col gap-5 text-2xl'>
                        <div className='flex flex-row gap-2 '>
                            <div className='font-bold'> Date of visit:</div>
                            <div>20/10/2023</div>
                        </div>
                        <div className='flex flex-row gap-2 '>
                            <div className="font-bold">Service:</div>
                            <div>Tooth Extraction</div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="font-bold">Dentist:</div>
                            <div>Dr.Anh Nguyen</div>
                        </div>
                    </div>
                    <button className='text-blue-hosta hover:underline text-xl flex flex-row justify-end pr-10'><Link to= "/prescriptions">View details  &#8250;</Link></button>
                </div>
            </div>
            <div className=' flex flex-row gap-20 pb-6'>
                <div className='border-2 border-solid border-black rounded-xl w-[500px] pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center record-container'>
                    <div className='font-bold text-4xl'>
                        TOOTH DECAY
                    </div>
                    <div className='flex flex-col gap-5 text-2xl'>
                        <div className='flex flex-row gap-2 '>
                            <div className='font-bold'> Date of visit:</div>
                            <div>20/10/2023</div>
                        </div>
                        <div className='flex flex-row gap-2 '>
                            <div className="font-bold">Service:</div>
                            <div>Tooth Extraction</div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="font-bold">Dentist:</div>
                            <div>Dr.Le Nguyen</div>
                        </div>
                    </div>
                    <button className='text-blue-hosta hover:underline text-xl flex flex-row justify-end pr-10'><Link to= "/prescriptions">View details  &#8250;</Link></button>
                </div>
            
                <div className='border-2 border-solid border-black rounded-xl w-[500px] pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center record-container'>
                    <div className='font-bold text-4xl'>
                        TOOTH DECAY
                    </div>
                    <div className='flex flex-col gap-5 text-2xl'>
                        <div className='flex flex-row gap-2 '>
                            <div className='font-bold'> Date of visit:</div>
                            <div>20/10/2023</div>
                        </div>
                        <div className='flex flex-row gap-2 '>
                            <div className="font-bold">Service:</div>
                            <div>Tooth Extraction</div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="font-bold">Dentist:</div>
                            <div>Dr.Minh Nguyen</div>
                        </div>
                    </div>
                    <button className='text-blue-hosta hover:underline text-xl flex flex-row justify-end pr-10'><Link to= "/prescriptions">View details  &#8250;</Link></button>
                </div>
            </div>
            <div id="no-match-message" className={`text-center mt-28 text-3xl ${searchQuery.trim() === '' ? 'hidden' : ''}`}>
                No records match the search criteria.
            </div>
        </div>
        
    </div>
    <Footer />
    </>)
}