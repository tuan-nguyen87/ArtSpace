//react
import React from 'react';
import './styles/ResLinks.css'; 

function ResLinks() {
  return (
    <div className="rl-body">
      <hr className="rl-hr" />
      <div className="rl-section-header">
        Explore | Tutorials | Resourceful Links
      </div>
      <div className="rl-container">
        <h3>Resourceful Links!</h3>
        <div className="p1">
          Whether you're a beginner or a seasoned artist, having the right materials is essential for unleashing your creativity.
        </div>

        <div className="rl-section">
          <ol>
            <li>
              <div className="h2">Traditional Art Supplies:</div>
              <ul>
                <li><strong><a href="https://castlearts.com/collections/painting">Paints: </a></strong>Online stores where you can purchase various types of paints.</li>
                <li><strong><a href="https://sunbeltmfg.com/collections/art-canvas">Canvases: </a></strong>Buy canvases in different sizes and quality.</li>
                <li><strong><a href="https://www.dickblick.com/categories/brushes/">Brushes: </a></strong>Explore options when when purchasing brushes suitable for different mediums.</li>
              </ul>
            </li>

            <li>
              <div className="h2">Digital Art Tools:</div>
              <ul>
                <li><strong><a href="https://store.huion.com/">Graphic Tablets: </a></strong>Suggestions for tablets for digital drawing and painting.</li>
                <li><strong><a href="https://www.clipstudio.net/how-to-draw/archives/155465">Software: </a></strong>Link to popular digital art software. </li>
                <li><strong><a href="https://www.artstation.com/marketplace/game-dev/brushes?page=3">Brush Packs: </a></strong>Links to buy brush packs for various digital art software.</li>
              </ul>
            </li>

            <li>
              <div className="h2">Miscellaneous Art Supplies</div>
              <ul>
                <li><strong><a href="https://www.cottonwoodarts.com/">Sketchbooks: </a></strong>Suggestions for sketchbooks suitable for different mediums.</li>
                <li><strong><a href="https://meedenart.com/collections/easels">Easels: </a></strong>Find easels for painting and drawing.</li>
                <li><strong><a href="https://www.kingartco.com/collections/art-accessories-1">Accessories: </a></strong>Link to art accessories.</li>
              </ul>
            </li>

            <li>
              <div className="h2">Where to Shop</div>
              <ul>
                <li>Online Retailers: Search for online stores that specialize in art supplies that offer a wide range of products.</li>
                <li>Local Art Stores: Find local art supply stores in your area, including suggestions for chain stores and independent retailers.</li>
                <li>Discounts and Deals: Stay updated on discounts, promotions, and clearance sales from various art supply vendors.</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default ResLinks;