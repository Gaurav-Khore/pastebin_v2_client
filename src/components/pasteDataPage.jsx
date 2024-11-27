import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getContentTitle, getUserInfo } from "../api";
import { Col, Container, Row } from "react-bootstrap";
import { ProfileDisplay } from "./profile";
import '../css/home.css'

const PasteData = () => {
    const params = useParams();
    const [errorMessage, setErrorMessage] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [edit , setEdit] = useState(false);
  const [content,setContent]= useState('');
  const [title,setTitle] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    getUserInfo().then(data => {
      if (data.data === null) {
        setErrorMessage(data.errors[0].message);
        return;
      }
      setUserInfo(data.data.getUserInfo);
    });

    getContentTitle(params.urlToken).then(data => {
        if (data.data === null) {
            window.alert(data.errors[0].message);
            return;
        }
        setEdit(data.data.getTitleData.editAction);
        setContent(data.data.getTitleData.data);
        setTitle(data.data.getTitleData.title);
    })
  }, [])
    return (
        <div>
            {
                edit ? (<div className="navBar" style={{width:"100%" , borderBottom:"1px solid rgb(214, 211, 211)"}}>
                    <button style={{ background: "transparent", border: "none", float: "right",paddingTop:"50px" }} onClick={() => {
                                            navigate("/home")
                                        }}><img src="../../public/home.png" alt="dots" style={{ width: "40px", height: "40px" }} /></button>
                    </div>) : (<></>)
            }
        <div>
        <Container fluid className="vh-100 vw-100 d-flex flex-column">
          <Row className="flex-grow-1">
            {
                edit ? (<Col md={3} className="d-flex justify-content-center p-0">
                    <div className="content-box">
                      <ProfileDisplay name={userInfo.name} email={userInfo.email} />
                    </div>
                  </Col>) : (<></>)
            }
            <Col md={edit ? 8 : 12} className="d-flex align-items-center justify-content-center p-0">
              <div className="content-box" style={{display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
                <div style={{ display:"flex",flexDirection:"column",justifyContent:"center",alignItems: "center", width:"100%",borderBottom:"1px solid black",fontSize:"30px",fontFamily:"sans-serif",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                    <p>Title:- {title}</p>
                </div>
                <div style={{ display:"flex",flexDirection:"column",justifyContent:"center", width:"100%", height:"500",fontSize:"30px",fontFamily:"sans-serif",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                <p>Content</p>
                <pre style={{paddingLeft:"10px",paddingTop:"10px",border:"1px solid black",overflow:"hidden",overflowY:"scroll",maxHeight:"300px"}}>{content}</pre>
                </div>
                {
                  edit ? (<div style={{ display:"flex",flexDirection:"column",justifyContent:"center", width:"100%", height:"500",borderBottom:"1px solid black",fontSize:"30px",fontFamily:"sans-serif",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                    <h2>{location.href}</h2>
                    </div>) : (<></>)
                }
                
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      </div>
    )
}

export default PasteData;