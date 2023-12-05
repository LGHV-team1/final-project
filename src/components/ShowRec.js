import React, { useState } from 'react'
import axios from 'axios'
import ApiService from '../api/ApiService'
import { useEffect } from 'react'
import MiniSlide from './MiniSlide'
function ShowRec({algorithmNum}) {
  const {BASE_URL: URL} = ApiService
  const [vodData, setvodData] = useState([])
  const config = {headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
  }}
  const getData = async () => {
    let url = `${URL}recommend/${algorithmNum}/`;
    try {
      const response = await axios.get(url,config,{ withCredentials: true } );
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
    <div className='my-10'>
      <h1>알고리즘{algorithmNum}번 추천</h1>
      <MiniSlide data={vodData} />
 
    </div>
     )
}

export default ShowRec