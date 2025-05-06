import { Route, Routes } from 'react-router-dom';
import Home from './Componants/Home/Home';
import Login from './Componants/Auth/Login';
import Encounter from './Componants/Encounter/Encounter';
import PriveteRoutes from './PriveteRoutes';
import PatientDetails from './Componants/Patient/PatientDetails';
const index = 0
function App() {
  return (
    <div className='min-h-screen'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />


        <Route path='/encounter' element={
          <PriveteRoutes>
            <Encounter />
          </PriveteRoutes>
        } />
        <Route path='/patient' element={
          <PriveteRoutes>
            <Encounter />
          </PriveteRoutes>
        } />
        <Route path={`/patient/patients-details`} element={
          <PriveteRoutes>
            <PatientDetails/>
          </PriveteRoutes>
        } />
      </Routes>
    </div>
  );
}

export default App;
