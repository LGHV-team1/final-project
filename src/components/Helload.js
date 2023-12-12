import ad1 from "../images/Ad/광고1.jpg"
import ad2 from "../images/Ad/광고2.jpg"
import ad3 from "../images/Ad/광고3.jpg"
import ad4 from "../images/Ad/광고4.jpg"
import ad4_1 from "../images/Ad/광고4_1.png"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function Helload() {
    const Arrowright = ({onClick}) => (
        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '10px', cursor: 'pointer', fill:'white'}} onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/>
            </svg>
        </div>
    );
    const Arrowleft = ({onClick}) => (
        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '10px', cursor: 'pointer', zIndex:'9', fill:'white'}} onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"/>
            </svg>
        </div>
    );
    const AdList = [ 
        { id: 1, img: ad1, vodname: "광고1", url: "https://www.lghellovision.net/benefits/event/eventDetail.do?Ls_Type=0&Ls_Order=0&Ls_Row=2&Ls_Idx=398&BN_CATE2=03&BN_CATE3=06&BN_CATE4=00"},
        { id: 2, img: ad2, vodname: "광고2", url: "https://www.lghellovision.net/benefits/event/eventDetail.do?Ls_Type=0&Ls_Order=0&Ls_Row=2&Ls_Idx=398&BN_CATE2=03&BN_CATE3=06&BN_CATE4=00"},
        { id: 3, img: ad3, vodname: "광고3", url: "https://www.lghellovision.net/benefits/event/eventDetail.do?Ls_Type=0&Ls_Order=0&Ls_Row=1&Ls_Idx=385"},
    ]
    const Click = (url) => {
        window.open(url)
    }
    const settings = {
        infinite: true,      // 슬라이드가 끝까지 가면 다시 처음으로 반복
        autoplay: true,      // 자동 재생
        autoplaySpeed: 5000, // 자동 재생 속도
        slidesToShow: 1,     // 한 번에 보여줄 슬라이드 개수
        slidesToScroll: 1,
        nextArrow: <Arrowright />,
        prevArrow: <Arrowleft />,
      };
        return (
            <div className="mt-[7%]">
                <Slider {...settings} >
                    {AdList.map((a) => (
                        <div key={a.id} className="relative">
                            <div className="img-body">
                            <a href={`${a.url}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                <img src={a.img} alt={a.vodname} style={{objectFit:"cover", width:"100%", height:"300px"}} />
                                </a>
                            </div>
                        </div>))}
                </Slider>
                <div className="relative my-36">
                    <img src={ad4_1} alt="구매가이드" className="absolute top-[-14%] left-[5%] z-[5]"  />
                    <a href="https://www.lghellovision.net/shop/isReasonOffer/isReasonOfferView.do?DPR_IDX=74&BN_CATE2=03&BN_CATE3=05&BN_CATE4=00" target="_blank" rel="noopener noreferrer">
                        <img className={"transition transform duration-500 ease-in-out hover:scale-105"} src={ad4} alt="구매가이드" style={{objectFit:"cover", width:"100%", height:"360px"}} />
                        <p className="absolute text-white top-32 text-5xl font-thin left-[5%]">헬로비전을 선택해야하는</p>
                        <p className="absolute text-white top-44 text-5xl font-extrabold left-[5%]">더 많은 이유</p>
                        <p className="absolute text-white top-60 t text-2xl font-bold left-[5%]">망설임을 확신으로, TV 구매가이드</p>
                    </a>
                </div>       


            </div>
        )
}


export default Helload