import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './components/login';
import PasteData from './components/pasteDataPage';
import Welcome from './components/welcome';
import { SignUp } from './components/sigin';
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Welcome />}/>
      <Route path='/login' element = {<Login />}/>
      <Route path='/home' element = {<Home />}/>
      <Route path='/signup' element = {<SignUp/>}/>
      <Route path='/:urlToken' element={<PasteData />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
