import React from 'react';

function SubmissionLog({ submissions }) {
  return (
    <ul>
      {submissions.map((submission, index) => (
        <li key={index}>
          <h3>Submission {submission.submissionId}</h3>
          <pre>{JSON.stringify(submission, null, 2)}</pre>
          <button onClick={() => editSubmission(submission.submissionId)}>Edit</button>
        </li>
      ))}
    </ul>
  );
}

export default SubmissionLog;