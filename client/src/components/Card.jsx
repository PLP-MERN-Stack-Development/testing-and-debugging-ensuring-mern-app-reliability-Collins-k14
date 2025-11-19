// src/components/Card.jsx
import React from "react";

const Card = ({ title = "No Title", author = "Unknown Author", date, excerpt = "No content", onClick }) => {
  return (
    <div
      data-testid="card"
      className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 text-sm mb-1">By {author}</p>
      {date && <p className="text-gray-400 text-xs mb-3">{date}</p>}
      <p className="text-gray-700 text-sm">{excerpt}</p>
    </div>
  );
};

export default Card;
