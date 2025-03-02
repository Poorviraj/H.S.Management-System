import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { endPoints } from '../utils/endpoints';
import HospitalCard from '../components/HospitalCard';
import { Link } from 'react-router-dom';

const { GET_ALL_HOSPITAL_API } = endPoints;

const Hospitals = () => {

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);


  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(GET_ALL_HOSPITAL_API, {
        query: query
      });

      if (!res.data.success) {
        alert(res.data.message);
        return;
      }
      setData(res.data.data);

    } catch (error) {
      alert(error);
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(GET_ALL_HOSPITAL_API);

        if (!res.data.success) {
          alert(res.data.message);
          return;
        }
        setData(res.data.data);

      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, [])

  return <div className=' min-h-screen bg-white ' >




    <div className=' w-[80%] mx-auto flex flex-col justify-center mb-[50px] ' >

      <div className=' flex items-center justify-center w-full mt-[20px] ' >
        <form onSubmit={handelSubmit} className=' flex gap-[10px] '>
          <input className='border pl-[10px] font-semibold rounded-2xl w-[300px] pt-[5px] pb-[5px]  focus:ring-0' placeholder='Type City here...' type="text" onChange={(e) => {
            setQuery(e.target.value);
          }} />
          <button type='submit' className=' border cursor-pointer pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-3xl font-semibold ' >Search</button>
        </form>
      </div>

      {
        data.length>0 ? (
          <div className=' grid grid-cols-3 gap-6 mt-[30px] ' >
          {
            data.map((item, index) => {
              return <Link to={`/hospital/${item._id}`} key={index}>
                <HospitalCard name={item.name} image={item.image} city={item.city} speciality={item.speciality} rating={item.rating} />
              </Link>
            })
          }
        </div>
        ) : (
          <div className=' flex justify-center items-center h-[500px] ' >
            <div className=' text-3xl font-bold text-black ' > 
              Data Not Found
            </div>
          </div>
        )
      }
    
    </div>

  </div>
}

export default Hospitals