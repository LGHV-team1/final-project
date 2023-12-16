
import { useDispatch } from 'react-redux';
import { setCategory } from '../redux/categorySlice';
import { Link } from 'react-router-dom';
function CategoryBtn({data , bigcategory}) {
    const dispatch = useDispatch();

    const handleCategoryClick = (category) => {
        dispatch(setCategory(category)); // Redux store 업데이트
        // 필요한 경우 추가 로직
    };
    const BASE_URL = "https://image.tmdb.org/t/p/w500";
    const BASE_URL_NO = "https://i.ibb.co/7pYHFY3";
    const dynamicUrl = `/${bigcategory}?category=`;
    const smallCategory = {
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
        "우리동네": "Neighborhood",
        "스포츠": "Sports",
        "라이프": "Life",
        "다큐": "Documentary",
        "TV애니메이션": "Animation",
        "TV드라마": "Drama",
        "TV 연예/오락": "Entertainment",
        "TV 시사/교양": "Education",
        "공연/음악": "Music",
        "애니메이션": "animation",
        "오락": "entertainment",
        "학습": "study",
        "기타": "etc",
}

return (
    <div className="text-gray-300 mb-[7%]">
        <div className="flex flex-wrap justify-start gap-2.5">
            {data.map((a, idx) => (
                <Link
                    key={a.id} 
                    to={`${dynamicUrl}${ (bigcategory==="tv") ? smallCategory[a.bigcategory]  : smallCategory[a.smallcategory]}`}
                    className="relative mb-3 mr-3 group" // 'group' 클래스를 여기에 추가
                    style={{ width: "230px", height: "350px" }}
                    onClick={() => handleCategoryClick((bigcategory==="tv") ? a.bigcategory  : a.smallcategory)}
                >
                    <img
                        src={a.imgpath === "/noimage.png" ? `${BASE_URL_NO}${a.imgpath}` : `${BASE_URL}${a.imgpath}`}
                        alt={a.name}
                        className="rounded object-cover w-full h-full opacity-50"
                    />
                    <p 
                            className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-3xl font-bold opacity-1 group-hover:scale-125 transition duration-300 ease-in-out"
                        >
                            { (bigcategory==="tv") ? a.bigcategory  : a.smallcategory}
                        </p>
                </Link>
            ))}
        </div>
    </div>
)


}

export default CategoryBtn;