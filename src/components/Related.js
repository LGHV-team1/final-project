import { Link } from "react-router-dom";

function Related({ data }) {
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const BASE_URL_NO = "https://i.ibb.co/7pYHFY3";
  return (
    <div className="w-full text-gray-300 mb-[7%]">
      <div className="flex flex-wrap justify-start">
        {data.map((a, idx) => (
          <div className="relative mb-3 mr-3 group flex-grow" style={{ flexBasis: 'calc(20% - 12px)' }} key={a.id}>
            <a
              href={`/detail/${a.id}`}
              className="no-underline"
            >
              <img
                src={
                  a.backgroundimgpath === "/noimage.png"
                    ? `${BASE_URL_NO}${a.backgroundimgpath}`
                    : `${BASE_URL}${a.backgroundimgpath}`
                }
                alt={a.name}
                className="rounded object-cover opacity-80 transition transform duration-500 ease-in-out hover:scale-95 w-full h-auto"
              />
              <p className="text-gray-400 text-center">{a.name}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Related;
