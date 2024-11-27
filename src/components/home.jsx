import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getUserInfo, insertData } from "../api";
import { ProfileDisplay } from "./profile";
import TitleList from "./title_list";
import { useNavigate } from "react-router-dom";
import '../css/home.css';

const Home = () => {
  const [userInfo, setUserInfo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [pasteData, setPasteData] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    getUserInfo().then(data => {
      if (data.data === null) {
        setErrorMessage(data.errors[0].message);
        return;
      }
      setUserInfo(data.data.getUserInfo);
    })
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(pasteData);
    console.log(title);
    insertData(pasteData, title).then(data => {
      console.log(data);
      if (data.data === null) {
        window.alert("Unable to Submit the data");
        return;
      }
      const token = data.data.insertData.url;
      navigate(`/${token}`);
    })
  }
  return (
    <div>
      {errorMessage ? (<p>{errorMessage}</p>) :
        (
          <div>
            <div className="navBar" style={{ width: "100%", borderBottom: "1px solid rgb(214, 211, 211)" }}>
        <button style={{ background: "transparent", border: "none", float: "right" ,paddingTop:"50px"}} onClick={() => {
          sessionStorage.clear();
          navigate("/")
        }}>LogOut</button>
      </div>
            <div>
              <Container fluid className="vh-100 vw-100 d-flex flex-column">
                <Row className="flex-grow-1">
                  <Col md={3} className="d-flex justify-content-center p-10">
                    <div className="content-box">
                      <ProfileDisplay name={userInfo.name} email={userInfo.email} />
                      <div>
                        <h3>History</h3>
                      </div>
                      <TitleList />
                    </div>
                  </Col>
                  <Col md={9} className="d-flex align-items-center justify-content-center p-10">
                    <div className="content-box" style={{display:"flex", flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
                      <form onSubmit={submitHandler} >
                        <div className="form-data">
                          <label>Title</label>
                          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="form-data">
                          <label>Paste Below</label>
                          <textarea type="text" rows={10} cols={50} value={pasteData} onChange={(e) => setPasteData(e.target.value)} />
                        </div>
                        <button style={{ width: "25%", backgroundColor: "#afadad", fontWeight: "bold" }} type="submit">Submit</button>
                      </form>
                    </div>

                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        )}
    </div>
  );
}

export default Home;