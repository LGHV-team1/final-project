import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../api/ApiService';
import { FaCheck } from "react-icons/fa";

function SelectContents() {
    const BASE_URL = "https://image.tmdb.org/t/p/w500";
    const BASE_URL_NO = "https://i.ibb.co/7pYHFY3";
    const location = useLocation();
    const { selectedCategories } = location.state || {};
    const [ vodlist, setVodlist] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedCategories) {
            const prefer = selectedCategories.join(',');
            ApiService.getPrefer(prefer)
            .then((response) => {
                const flattenedList = [].concat.apply([], response.data);
                setVodlist(flattenedList);
                console.log(flattenedList);
            });
        }
    }, [selectedCategories]);

    const handleSelect = (id) => {
        if (selectedIds.length >= 5 && !selectedIds.includes(id)) {
            alert("최대 5개의 콘텐츠만 선택할 수 있습니다.");
        } else {
            setSelectedIds((prevSelectedIds) => 
                prevSelectedIds.includes(id) ? prevSelectedIds.filter((selectedId) => selectedId !== id) : [...prevSelectedIds, id]
            );
        }
    };

    const handleSubmit = () => {
        ApiService.changePrefer(selectedIds)
            .then(response => {
                console.log('prefer sent:', response);
                navigate("/home"); // 또는 다른 로직
            })
            .catch(error => {
                console.error('Error sending selected IDs:', error);
            });
    };


    const isSelected = (id) => {
        return selectedIds.includes(id);
    };

    console.log(selectedIds)
    return (
        <div className="mx-44 my-[7%] text-gray-300 text-center">
            <div className="mb-5">
                <h1>선호 콘텐츠를 5개 선택해보세요</h1>
            </div>
            <div className="flex flex-wrap justify-center">
                {vodlist.map((a) => (
                    <div key={a.id} className="relative inline-block m-2 mb-5" onClick={() => handleSelect(a.id)} style={{ width: "calc(18% - 4px)" }}>
                        <img
                            className={`rounded ${isSelected(a.id) ? 'opacity-30' : ''}`}
                            src={a.imgpath === "/noimage.png" ? `${BASE_URL_NO}${a.imgpath}` : `${BASE_URL}${a.imgpath}`}
                            alt={a.name}
                            style={{ objectFit: "cover", width: "100%", height: "400px"}}
                        />
                        {isSelected(a.id) && (
                            <FaCheck className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" size={70} color="yellow"/>
                        )}
                        <div className="text-gray-300 text-[18px] text-center mt-1">
                            {a.name}
                        </div>
                    </div>
                ))}
            </div>
            {selectedIds.length === 5 && (
                <button 
                    onClick={handleSubmit}
                    className="mt-10 px-4 py-2 text-white bg-gray-500 rounded"
                ><FaCheck size={20} color="yellow" className='inline-block mr-2'/>
                    확인
                </button>
            )}
        </div>
    );
}
export default SelectContents