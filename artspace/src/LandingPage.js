import React from "react";
import "./styles/LandingPage.css";

const LandingPage = () => {
  
    var input = document.getElementById('search');
    var output = document.getElementById('output');

    function performSearch() {
      var searchTerm = input.value;

      // Perform some processing or logic based on the search term
      // For example, you can check if it matches a specific value or use regular expressions

      // Simulate a simple example by checking for a specific search term
      if (searchTerm === 'hello') {
        output.innerHTML = 'You typed: ' + searchTerm;
      } else {
        output.innerHTML = 'No matching result for the search term: ' + searchTerm;
      }
    }

  return (
    <div className="landing-container">
      <div class="main">
        <section class="welcome">
          <h1>Connecting Artists to Clients Everywhere</h1>
          <input type="text" id="search" placeholder="Search ArtSpace" onkeyup="search()"/>
          <i class="bx bx-search"></i>
          <p id="output"></p>
        </section>
        <section class="services">
          <h2>Popular:</h2>
          <button type="submit" class="btns">
            Logo Design
          </button>
          <button type="submit" class="btns">
            Flyers
          </button>
          <button type="submit" class="btns">
            Business Cards
          </button>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
