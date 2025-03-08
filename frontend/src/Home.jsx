import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const Redirect = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="flex justify-center items-center">
        <div>
          <h1>Kindly Login to Read and Create Blogs</h1>
          <button onClick={Redirect}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
