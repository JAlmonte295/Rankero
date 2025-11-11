import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import * as rankService from './services/rankService';

import NavBar from './components/NavBar/NavBar';
import Header from './components/Header/Header';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import HomePage from './components/HomePage/HomePage';
import MyRanks from './components/MyRanks/MyRanks';
import RankList from './components/RankList/RankList';
import RankDetails from './components/RankDetails/RankDetails';
import RankForm from './components/RankForm/RankForm';

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);
  const [ranks, setRanks] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddRank = async (rankFormData) => {
    const newRank = await rankService.create(rankFormData);
    setRanks([newRank, ...ranks]);
    navigate(`/ranks/${newRank._id}`);
  };

  const handleDeleteRank = async (rankId) => {
    const deletedRank = await rankService.deleteRank(rankId);
    setRanks(ranks.filter((rank) => rank._id !== deletedRank._id));
    navigate('/ranks');
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

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Ranks';
    if (path === '/ranks') return 'All Ranks';
    if (path === '/ranks/new') return 'Create New Rank';
    if (path.startsWith('/ranks/') && path.endsWith('/edit')) return 'Edit Rank';
    if (path.startsWith('/ranks/')) return 'Rank Details';
    if (path.endsWith('/ranks')) return 'My Ranks';
    if (path === '/sign-up') return 'Sign Up';
    if (path === '/sign-in') return 'Sign In';
    return 'Rankero';
  };

  const pageTitle = getPageTitle();


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
      <Header pageTitle={pageTitle} toggleNav={toggleNav} />
      <NavBar/>
      <main>
        <Routes>
          <Route path='/' element={user ? <HomePage ranks={ranks} /> : <Landing ranks={ranks} />} />
          {user ? (
            <>
            <Route path='/ranks' element={<RankList ranks={ranks} />} />
            <Route path='/ranks/new' element={<RankForm handleAddRank={handleAddRank}  />} />
            <Route path='/ranks/:rankId' element={<RankDetails handleDeleteRank={handleDeleteRank} handleUpdateComment={handleUpdateComment} />} />
            <Route path='/ranks/:rankId/edit' element={<RankForm handleUpdateRank={handleUpdateRank} />} />
            <Route path='/:userId/ranks' element={<MyRanks allRanks={ranks} />} />
            </>
  
          ) : (
            <>
            <Route path='/ranks' element={<RankList ranks={ranks} />} />
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
