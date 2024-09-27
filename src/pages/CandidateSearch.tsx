import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem('savedCandidates');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Fetch initial candidates from GitHub when the component mounts
    const fetchData = async () => {
      try {
        const result = await searchGithub();
        setCandidates(result);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch candidates');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveCandidate = async () => {
    const currentCandidate = candidates[currentCandidateIndex];
    const userDetails = await searchGithubUser(currentCandidate.login);
    const updatedCandidate = { ...currentCandidate, ...userDetails };

    const newSaved = [...savedCandidates, updatedCandidate];
    setSavedCandidates(newSaved);
    localStorage.setItem('savedCandidates', JSON.stringify(newSaved));
    handleNextCandidate();
  };

  const handleNextCandidate = () => {
    if (currentCandidateIndex < candidates.length - 1) {
      setCurrentCandidateIndex(currentCandidateIndex + 1);
    } else {
      alert('No more candidates available');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const currentCandidate = candidates[currentCandidateIndex];

  return (
    <div>
      <h2>Candidate Search</h2>
      <div className="candidate-info">
        <img src={currentCandidate.avatar_url} alt="avatar" />
        <p>Username: {currentCandidate.login}</p>
        <p>
          Profile: <a href={currentCandidate.html_url}>{currentCandidate.html_url}</a>
        </p>
      </div>
      <button onClick={handleSaveCandidate}>+</button>
      <button onClick={handleNextCandidate}>-</button>
    </div>
  );
};

export default CandidateSearch;
