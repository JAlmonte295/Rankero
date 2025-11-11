import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import * as rankService from './services/rankService';

import NavBar from './components/NavBar/NavBar';
import Header from './components/Header/Header';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import HomePage from './components/HomePage/HomePage';
import MyRanks from './components/MyRanks/MyRanks';
import RankDetails from './components/RankDetails/RankDetails';
import RankForm from './components/RankForm/RankForm';

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);
  const [ranks, setRanks] = useState([]);
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(true);

  const handleAddRank = async (rankFormData) => {
    const newRank = await rankService.create(rankFormData);
    setRanks([newRank, ...ranks]);
    navigate(`/ranks/${newRank._id}`);
  };

  const handleDeleteRank = async (rankId) => {
    const deletedRank = await rankService.deleteRank(rankId);
    setRanks(ranks.filter((rank) => rank._id !== deletedRank._id));
    navigate('/my-ranks');
  };

  const handleUpdateRank = async (rankId, rankFormData) => {
    const updatedRank = await rankService.updateRank(rankId, rankFormData);
    setRanks(ranks.map((rank) => (rank._id === updatedRank._id ? updatedRank : rank)));
    navigate(`/ranks/${rankId}`);
  };

  const handleUpdateComment = async (rankId, commentId, commentFormData) => {
    const updatedRank = await rankService.updateComment(rankId, commentId, commentFormData);
    setRanks(ranks.map((rank) => (rank._id === updatedRank._id ? updatedRank : rank)));
    navigate(`/ranks/${rankId}`);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const fetchAllRanks = async () => {
      const ranksData = await rankService.index();

      setRanks(ranksData);
    };
    fetchAllRanks();
  }, []);

  useEffect(() => {
    if (isNavOpen) {
      document.body.classList.remove('nav-closed');
    } else {
      document.body.classList.add('nav-closed');
    }
  }, [isNavOpen]);
  
  return (
    <>
      <Header toggleNav={toggleNav} />
      <NavBar/>
      <main>
      <Routes>
        <Route path='/' element={user ? <HomePage ranks={ranks} /> : <Landing ranks={ranks} />} />
        {user ? (
          <>
          <Route path='/ranks/new' element={<RankForm handleAddRank={handleAddRank}  />} />
          <Route path='/ranks/:rankId' element={<RankDetails handleDeleteRank={handleDeleteRank} handleUpdateComment={handleUpdateComment} />} />
          <Route path='/ranks/:rankId/edit' element={<RankForm handleUpdateRank={handleUpdateRank}/>} />
          <Route path='/my-ranks' element={<MyRanks allRanks={ranks} />} />
          </>

        ) : (
          <>
          <Route path='/ranks/:rankId' element={<RankDetails handleDeleteRank={handleDeleteRank} />} />
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
      </main>
    </>
  );
};

export default App;
