import React, { useState, useEffect } from "react";
import { fetchStarters } from "../services/starterService";

export const Starter = () => {
  const [starters, setStarters] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchStarters()
      .then((data) => {
        setStarters(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the starters!", error);
        setErrorMessage("Failed to fetch starters. Please try again later.");
      });
  }, []); // Empty dependency array means this effect runs once on mount

  const handleRefreshStarters = () => {
    fetchStarters()
      .then((data) => {
        setStarters(data);
      })
      .catch((error) => {
        console.error("There was an error refreshing starters!", error);
        setErrorMessage("Failed to refresh starters. Please try again later.");
      });
  };

  return (
    <div className="mt-5 container">
      <div className="card">
        <div className="card-header">Fetched Message</div>
        <div className="card-body">
          {errorMessage ? (
            <p className="text-danger">{errorMessage}</p>
          ) : (
            <p>{starters.length > 0 ? starters[0].message : "No starters available."}</p>
          )}
          <button className="btn btn-primary mt-3" onClick={handleRefreshStarters}>
            Refresh Starters
          </button>
        </div>
      </div>
    </div>
  );
};

