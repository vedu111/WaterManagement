import React from 'react';
import './ComplaintPreview.css';

const ComplaintPreview = ({ complaints, loading }) => {
  if (loading) return <p>Loading...</p>;
  if (complaints.length === 0) return <p>No complaints found.</p>;

  return (
    <>
      {complaints.map((complaint, index) => (
        <div className="div-main" key={index}>
          <div className="div1">
            <div className="div2">{complaint.name}</div>
            <div className="div3">
              <button className="tag1">{complaint.category}</button>
              {complaint.category_2 && (
                <button className="tag2">{complaint.category_2}</button>
              )}
            </div>
            <div className="div4">
              {complaint.address}
              <span className="date">{new Date(complaint.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ComplaintPreview;
