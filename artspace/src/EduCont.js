import React from 'react';
import './styles/EduCont.css';

function EduCont() {
  return (
    <div className="ec-body">
      <hr className="ec-hr" />
      <div className="ec-section-header">
        Explore | Tutorials | Educational Content
      </div>
      <div className="ec-container">
        <h3>Educational Content!</h3>
        <div className="p1">
          a broad range of topics designed to teach individuals about various
          aspects of art, including its history, techniques, theories, styles,
          and notable artists
        </div>

        <div className="ec-section">
          <div className="h2">Introduction to Art History</div>
          <div className="p2">
            Art history is the study of visual art and its development
            throughout history. Here are some different periods and movements
            that have shaped the art world.
          </div>
          <ul>
            <li>
              Ancient Art: Discover the art of ancient civilizations like
              Egyptian, Greek, and Roman.
            </li>
            <li>
              Renaissance: Uncover the rebirth of artistic expression in Europe
              during the 14th to 17th centuries.
            </li>
            <li>
              Baroque, Rococo, and Neoclassicism: Explore the opulence of
              Baroque, the elegance of Rococo, and the return to classical
              forms.
            </li>
            <li>
              Romanticism, Realism, and Impressionism: Delve into the emotional
              intensity of Romanticism, the truthful portrayal of Realism, and
              the fleeting impressions of Impressionism.
            </li>
            <li>
              <a href="https://www.artsy.net/article/art-history-101">
                More about different art periods and movements
              </a>
            </li>
          </ul>
        </div>

        <div className="ec-section">
          <div className="h2">Understanding Color Theory</div>
          <div className="p2">
            Color is one of the fundamental elements of art. Understanding color
            theory can enhance your artistic skills and help you create visually
            appealing compositions.
          </div>
          <ul>
            <li>Primary, Secondary, and Tertiary Colors: Learn about the basics of color mixing.</li>
            <li>Color Harmony: Explore different color schemes like complementary, analogous, and triadic.</li>
            <li>Color Psychology: Discover how colors can evoke emotions and convey messages in art.</li>
            <li><a href="https://www.jerrysartarama.com/blog/color-theory-101-basic-mixing-tips-tricks-for-artists-jerrys-live-episode-88/">More about art theory</a></li>
          </ul>
        </div>

        <div className="ec-section">
          <div className="h2">Exploring Different Art Styles</div>
          <div className="p2">
            Artists express themselves in various styles, each with its own
            unique characteristics and techniques. Here are some of the most
            prominent art styles:
          </div>
          <ul>
            <li>Cubism: Explore the fractured perspectives of Picasso and Braque.</li>
            <li>Surrealism: Enter the dreamlike worlds of Dali and Magritte.</li>
            <li>Abstract Expressionism: Experience the emotional intensity of artists like Jackson Pollock and Mark Rothko.</li>
            <li><a href="https://www.studiobinder.com/blog/types-of-art-styles-list/">More about different art styles</a></li>
          </ul>
        </div>

        <div className="ec-section">
          <div className="h2">Discovering Various Art Mediums</div>
          <div className="p2">
            Artists use a wide range of mediums to bring their visions to life.
            From traditional to contemporary, here are some popular art mediums:
          </div>
          <ul>
            <li>Drawing: Learn the basics of sketching and shading with pencil and charcoal.</li>
            <li>Painting: Explore the world of acrylics, oils, and watercolors.</li>
            <li>Sculpture: Experiment with clay, wood, metal, and other sculpting materials.</li>
            <li><a href="https://www.artlex.com/visual-art-forms/types-of-art-mediums/">More about different art mediums</a></li>
          </ul>
        </div>

        <div className="ec-section">
          <div className="h2">Spotlight on Famous Classical Artists</div>
          <div className="p2">
            Throughout history, certain artists have left an indelible mark on
            the art world with their masterpieces. Here are some of these
            classical artists:
          </div>
          <ul>
            <li>Leonardo da Vinci: Discover the genius of the Renaissance polymath.</li>
            <li>Vincent van Gogh: Explore the vibrant and tumultuous life of the post-impressionist painter.</li>
            <li>Michelangelo: Marvel at the timeless beauty of his sculptures and frescoes.</li>
            <li><a href="https://www.artsheaven.com/artists-movement/classical-artists/">More about different classical art artists</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EduCont;