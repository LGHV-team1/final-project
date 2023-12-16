function Related( {data}){
    const BASE_URL = "https://image.tmdb.org/t/p/w500";
    const BASE_URL_NO = "https://i.ibb.co/7pYHFY3";
return(
<div className="text-gray-300 mb-[7%]">
        <div className="flex flex-wrap justify-start">
            {data.map((a, idx) => (
                <a 
                    key={a.id} 
                    href={`/detail/${a.id}`}
                    className="relative mb-3 mr-3 group" // 'group' 클래스를 여기에 추가
                    style={{ width: "280px", height: "180px", textDecoration:"none"}}
                >
                    <img
                        src={a.backgroundimgpath === "/noimage.png" ? `${BASE_URL_NO}${a.backgroundimgpath}` : `${BASE_URL}${a.backgroundimgpath}`}
                        alt={a.name}
                        style={{width: "280px", height: "180px"}}
                        className="rounded object-cover opacity-80"
                    />
                    <p className="text-gray-400 text-center mt-2"> 
                            {a.name}
                        </p>
                </a>
            ))}
        </div>
    </div>


) 

}

export default Related