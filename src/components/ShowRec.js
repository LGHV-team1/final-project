import React, { useState } from 'react'
import ApiService from '../api/ApiService'
import { useEffect } from 'react'
import RecMiniSlide from './RecMiniSlide'

function ShowRec({algorithmNum}) {

  const [vodData, setvodData] = useState([])
  const getData = async () => {
    
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