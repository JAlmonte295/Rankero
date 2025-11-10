import { useContext, useState, useEffect, use } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import * as rankService from './services/rankService';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import RankList from './components/RankList/RankList';
import RankDetails from './components/RankDetails/RankDetails';
import RankForm from './components/RankForm/RankForm';
import CommentForm from './components/CommentForm/CommentForm';

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);
  const [ranks, setRanks] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchAllRanks = async () => {
      const ranksData = await rankService.index();

      setRanks(ranksData);
    };
    fetchAllRanks();
  }, []);
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <RankList ranks={ranks}/> : <Landing />} />
        {user ? (
          <>
          <Route path='/ranks' element={<RankList ranks={ranks} />} />
          <Route path='/ranks/new' element={<RankForm handleAddRank={handleAddRank}  />} />
          <Route path='/ranks/:rankId' element={<RankDetails handleDeleteRank={handleDeleteRank} />} />
          <Route path='/ranks/:rankId/edit' element={<RankForm handleUpdateRank={handleUpdateRank}/>} />
          <Route path='/ranks/:rankId/comments/:commentId/edit' element={<CommentForm handleUpdateComment={handleUpdateComment} />} />
          <Route path='/:userId/ranks' element={<RankList ranks={ranks} />} />
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
    </>
  );
};

export default App;
