import { useContext, useState, useEffect, use } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as rankService from './services/rankService';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import RankList from './components/RankList/RankList';
import RankDetails from './components/RankDetails/RankDetails';

import { UserContext } from './contexts/UserContext';



const App = () => {
  const { user } = useContext(UserContext);
  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    const fetchAllRanks = async () => {
      const ranksData = await rankService.index();

      setRanks(ranksData);
    };
    if (user) fetchAllRanks();
  }, [user]);
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
          <Route path='/ranks' element={<RankList ranks={ranks} />} />
          <Route path='/ranks/:rankId' element={<RankDetails />} />
          </>
        ) : (
          <>
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}

      </Routes>
    </>
  );
};

export default App;
