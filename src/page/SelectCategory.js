import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
function SelectCategory() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (selectedCategories.length === 5) {
    //         navigate('/SelectContents', { state: { selectedCategories } });
    //     }
    // }, [selectedCategories, navigate]);

    const handleCategoryClick = (category, type) => {
        const prefixedCategory = `${type}${category}`;
        if (selectedCategories.includes(prefixedCategory)) {
            setSelectedCategories(selectedCategories.filter(item => item !== prefixedCategory));
        } else if (selectedCategories.length < 5) {
            setSelectedCategories(prevCategories => [...prevCategories, prefixedCategory]);
        } else {
            alert("최대 5개의 카테고리만 선택할 수 있습니다.");
        }
    };

    const handleConfirm = () => {
        navigate('/SelectContents', { state: { selectedCategories } });
    };

    const isCategorySelected = (category, type) => {
        return selectedCategories.includes(`${type}${category}`);
    };

    const movieCategory = {
        "SF/환타지" : "fantasy",
        "공포/스릴러": "thriller",
        "다큐멘터리": "documentary",
        "단편": "shortfilm",
        "드라마": "drama",
        "로맨틱코미디": "RoCo",
        "멜로": "melo",
        "무협": "martial",
        "뮤지컬": "musical",
        "애니메이션": "animation",
        "액션/어드벤쳐" : "action",
        "역사": "history",
        "코미디": "comedy",
        "기타": "etc",
    }
      const tvCategory = {
            "우리동네": "Neighborhood",
            "스포츠": "Sports",
            "라이프": "Life",
            "다큐": "Documentary",
            "TV애니메이션": "Animation",
            "TV드라마": "Drama",
            "TV 연예/오락": "Entertainment",
            "TV 시사/교양": "Education",
            "공연/음악": "Music",
            "기타": "etc",
        }    
      const kidCategory = {
        "애니메이션": "animation",
        "오락": "entertainment",
        "학습": "study",
        "기타": "etc",
    }
    console.log(selectedCategories)
    return(
        <div className="mx-28 my-[7%] text-gray-300 text-center">
            <div className="mb-5">
                <h1>처음이신가요? 좋아하는 장르 5개를 선택해보세요</h1>
            </div>
            <div > 
                <p>영화</p>
                <div>
                    {/* 첫 번째 줄: 처음 7개의 카테고리 */}
                    {Object.keys(movieCategory).slice(0, 7).map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryClick(movieCategory[category], 'movie*')}
                            className={`my-2 mx-2 py-2 rounded-md px-3 ${
                                isCategorySelected(movieCategory[category],'movie*')
                                ? "bg-white text-my-color"
                                : "bg-my-color text-white hover:bg-my-color/70"
                            }`}
                            >
                            {category}
                        </button>
                    ))}
                </div>
                <div>
                    {/* 두 번째 줄: 나머지 8개의 카테고리 */}
                    {Object.keys(movieCategory).slice(7).map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryClick(movieCategory[category] , 'movie*')}
                            className={`my-2 mx-2 py-2 rounded-md px-3 ${
                                isCategorySelected(movieCategory[category],'movie*')
                                ? "bg-white text-my-color"
                                : "bg-my-color text-white hover:bg-my-color/70"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            <hr></hr>
            <div> 
            <p>TV프로그램</p>
            <div>
                    {/* 첫 번째 줄: 처음 5개의 카테고리 */}
                    {Object.keys(tvCategory).slice(0, 5).map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryClick(tvCategory[category] , 'tv*')}
                            className={`my-2 mx-2 py-2 rounded-md px-3 ${
                                isCategorySelected(tvCategory[category], 'tv*')
                                ? "bg-white text-my-color"
                                : "bg-my-color text-white hover:bg-my-color/70"
                            }`}
                            >
                            {category}
                        </button>
                    ))}
                </div>
                <div>
                    {/* 두 번째 줄: 나머지의 카테고리 */}
                    {Object.keys(tvCategory).slice(5).map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryClick(tvCategory[category], 'tv*')}
                            className={`my-2 mx-2 py-2 rounded-md px-3 ${
                                isCategorySelected(tvCategory[category], 'tv*')
                                ? "bg-white text-my-color"
                                : "bg-my-color text-white hover:bg-my-color/70"
                            }`}
                            >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            <hr></hr>
            <div>
            <p>키즈</p>
            {Object.keys(kidCategory).map((category, index) => (
                <button
                    key={index}
                    onClick={() => handleCategoryClick(kidCategory[category],'kids*')}
                    className={`my-2 mx-2 py-2 rounded-md px-3 ${
                        isCategorySelected(kidCategory[category], 'kids*')
                        ? "bg-white text-my-color"
                        : "bg-my-color text-white hover:bg-my-color/70"
                    }`}
                    >
                    {category}
                </button>
            ))}
            </div>
            {selectedCategories.length === 5 && (
                <button 
                    onClick={handleConfirm}
                    className="mt-10 px-4 py-2 text-white bg-gray-500 rounded"
                ><FaCheck size={20} color="yellow" className='inline-block mr-2'/>
                    확인
                </button>
            )}
        </div>

    )


}

export default SelectCategory;