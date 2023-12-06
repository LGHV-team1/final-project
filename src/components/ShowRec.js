import React, { useState } from 'react'
import axios from 'axios'
import ApiService from '../api/ApiService'
import { useEffect } from 'react'
import RecMiniSlide from './RecMiniSlide'
function ShowRec({algorithmNum}) {
  const {BASE_URL: URL} = ApiService
  const [vodData, setvodData] = useState([])
  const config = {headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
  }}
  const getData = async () => {
    let url = `${URL}recommend/${algorithmNum}/`;
    try {
      const response = await ApiService.getRec(algorithmNum)
      //axios.get(url,config,{ withCredentials: true } );
      const data = response.data;
      console.log(data);
      setvodData(data)
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className='mb-24 mt-5'>
      <RecMiniSlide data={vodData} />
 
    </div>
     )
}

export default ShowRec