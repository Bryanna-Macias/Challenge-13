import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem('savedCandidates');
    return saved ? JSON.parse(saved) : [];
  });

  if (savedCandidates.length === 0) {
    return <p>No candidates have been accepted.</p>;
  }

  return (
    <div>
      <h1>Potential Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Username</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate, index) => (
            <tr key={index}>
              <td><img src={candidate.avatar_url} alt="avatar" /></td>
              <td>{candidate.login}</td>
              <td>{candidate.location}</td>
              <td>{candidate.email}</td>
              <td>{candidate.company}</td>
              <td><a href={candidate.html_url}>{candidate.html_url}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;
