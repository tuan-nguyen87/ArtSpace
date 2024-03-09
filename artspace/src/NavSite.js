//react
import React from 'react';
import './styles/NavSite.css'; // Import CSS file

function NavSite() {
  return (
    <div className="ns-body">
      <hr className="ns-hr" />
      <div className="ns-section-header">
        Explore | Tutorials | Navigate Site
      </div>
      <div className="ns-container">
        <h3>Welcome to ArtSpace!</h3>
        <div className="p1">What is ArtSpace you might ask?? ArtSpace is a web app connecting student artists with clients seeking 
          custom artwork. It offers students real-world experience through commission jobs and allows clients to find 
          talented young artists for personalized creations. So lets show you around!</div>
          
        <section>
          <h4>Home Page</h4>
          <p>Whether you're looking for art tutorials, commissioning custom pieces, or if you are an artist yourself wanting to find 
            talented artists for collaboration, you're in the right place. Use the search bar to find what you need. Explore 
            our navigation bar to discover more in detail, from artwork in our Showroom to having a chat about art in our Social Hub. 
            And whenever you want to return home, simply click on our logo! 
          </p>
          <img src="/NavSite art/ns_Home.png" alt="Home Page" />
        </section>

        <section>
          <h4>Explore Section</h4>
          <p>If you're an artist seeking inspiration or a client looking for the perfect piece, our Explore section has you covered.</p>
          <p>This section includes:</p>
          <ul>
            <li>Tutorial Page</li>
            <p>Discover our Tutorial Page for helpful tips and guidance</p>
            <img src="/NavSite art/ns_Tutorial.png" alt="Tutorial Page" />
            <li>Commission Listing Page</li>
            <p>Explore our Commission Listing Page to find artists ready to bring your vision to life</p>
            <img src="/NavSite art/ns_Listing.png" alt="Commission Listing Page" />
            <li>Showroom Page</li>
            <p>Visit our Showroom Page to see stunning works on display.</p>
            <img src="/NavSite art/ns_shrm.png" alt="Showroom Page" />
          </ul>
        </section>

        <section>
          <h4>Interact Section</h4>
          <p>If you're looking to challenge yourself, compete with others, or simply connect with like-minded individuals, 
            our Interact section offers possibilities for engagement.
          </p>
          <p>This section includes:</p>
          <ul>
            <li>Daily Challenges Page</li>
            <p>Visit our Daily Challenges Page to test your skills and creativity with new prompts every day to earn points.</p>
            <img src="/NavSite art/ns_DC.png" alt="Daily Challenges page" />
            <li>Arena Page</li>
            <p>Dive into the Arena Page to participate in friendly competitions, showcase your talents, and win points.</p>
            <img src="/NavSite art/ns_Arena.png" alt="Arena Page" />
            <li>Social Hub Page</li>
            <p>Explore the Social Hub Page to connect with fellow artists and discover inspiration from a vibrant community.</p>
            <img src="/NavSite art/ns_SH.png" alt="Social Hub Page" />
          </ul>
        </section>

        <section>
          <h4>Market Section</h4>
          <p>If you're looking to add flair to your profile or celebrate your accomplishments, our Market section offers a 
            variety of options to enhance your artistic journey. Artists can exchange their earned points for badges, icons, emotes etc...
          </p>
          <img src="/NavSite art/ns_Market.png" alt="Market Page" />
        </section>

        <section>
          <h4>Profile Section</h4>
          <p>In the profile section you'll discover a comprehensive suite of tools to manage your artistic journey.</p>
          <p>This section includes:</p>
          <ul>
            <li>Profile</li>
            <p>Here you'll find quick links to your Messages, Portfolio, Commissions, and Collaborations</p>
            <img src="/NavSite art/ns_Profile.png" alt="Profile Page" />
            <li>Portfolio</li>
            <p>Access your Portfolio Page to showcase your work and personal details</p>
            <img src="/NavSite art/ns_Portfolio.png" alt="Portfolio Page" />
            <li>Commissions</li>
            <p>Manage your commission requests and track your ongoing projects.</p>
            <img src="/NavSite art/ns_Commission.png" alt="Commission Page" />
            <li>Messages</li>
            <p>Stay connected with other artists through the Messages Page, where you can communicate and collaborate seamlessly</p>
            <img src="/NavSite art/ns_Messages.png" alt="Messages Page" />
            <li>Collaborations</li>
            <p>Explore the Collaboration Page to find opportunities for joint projects and creative partnerships.</p>
            <img src="/NavSite art/ns_Collab.png" alt="Collaborations Page" />
            <li>My Points</li>
            <p>Here is where you can track your earnings, progress, and achievements.</p>
            <img src="/NavSite art/ns_Points.png" alt="Points Page" />
            <li>Leave a Review</li>
            <p>Leave a rating and review to share feedback and testimonials, building your reputation within the ArtSpace community.</p>
            <img src="/NavSite art/ns_RR.png" alt="Rate and Review Page" />
          </ul>
        </section>
      </div>
    </div>
  );
}

export default NavSite;