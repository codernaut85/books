import React from 'react';
import { Link } from "react-router-dom";

function Home() {
  return <section className="wrapper">
    <h1>Homepage</h1>
    <p>Welcome to the <Link className="link" to="/books/page/1">book archive</Link></p>
  </section>
};

export default Home;