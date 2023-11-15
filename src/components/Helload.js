import hellotv from "../images/hellotv.png"
function Helload() {
    return(
        <div style={{backgroundColor:"black", width:"100vw", marginTop:"200px", paddingBottom:"200px"}}>
            <div style={{verticalAlign: "middle", float: "left", marginRight:"30px"}}>
                최대 54% 저렴! <br/>
                    500M인터넷+방송 월 2만원<br/>
                    지금 바로 가입상담!<br/>
                    1855-1082
            </div>
            <img alt="hellovisiontv" src={hellotv} width="300" style={{float:"left"}}></img>
        </div>

    )
}


export default Helload