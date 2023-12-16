import { Link } from "react-router-dom";

function Related({ data }) {
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const BASE_URL_NO = "https://i.ibb.co/7pYHFY3";
  return (
    <div className="text-gray-300 mb-[7%]">
      <div className="flex flex-wrap justify-start">
        {data.map((a, idx) => (
          <div className="relative mb-3 mr-3 group" >
            <Link
              key={a.id}
              to={`/detail/${a.id}`}
              className="no-underline"
            >
              <img
                src={
                  a.backgroundimgpath === "/noimage.png"
                    ? `${BASE_URL_NO}${a.backgroundimgpath}`
                    : `${BASE_URL}${a.backgroundimgpath}`
                }
                alt={a.name}
                style={{ width: "280px", height: "180px" }}
                className="rounded object-cover opacity-80 transition transform duration-500 ease-in-out hover:scale-95"
              />
              <p className="text-gray-400 text-center ">{a.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Related;
