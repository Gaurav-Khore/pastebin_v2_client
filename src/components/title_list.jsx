import { useEffect, useState } from "react";
import { getTitleList } from "../api";
import { useNavigate } from "react-router-dom";

const TitleList = () => {
    const [errorMessage,setErrorMessage] = useState();
    const [titles,setTitles] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getTitleList().then(data => {
            // console.log(data);
            if (data.data===null) {
                console.log(data);
                setErrorMessage(data.errors[0].message);
                return;
            }
            setTitles(data.data.getTitleList);
        })
    },[])

    return (
        <div style={{overflow:"hidden",overflowY:"scroll", height:"300px"}}>
            {titles.map((title,index) => 
                <div key={index} style={{borderRadius:"10px" , boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)",cursor:"pointer"}}>
                    <p style={{fontSize:"20px" , padding:"10px"}} onClick={() => {navigate(`/${title.url}`)}}>{title.title}</p>
                </div>
            )}
        </div>
    );
}

export default TitleList;