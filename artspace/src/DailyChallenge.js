import React, {useState, useEffect} from "react";
import "./DailyChallenge.css";

const DailyChallenge = () => {

    return(
        <div className="challenge-container">
            <div class="prompt-topics">
                <button type="submit" class="pBtns" id="environment-btn">Environment</button>
                <button type="submit" class="pBtns" id="char-btn">Character</button>
                <button type="submit" class="pBtns" id="creature-btn">Creature</button>
                <button type="submit" class="pBtns" id="obj-btn">Object</button>
            </div>
            <div class="prompt-box">
                <h1>Challenge of the Day</h1>
                <p id="prompt"></p>
                <br/>
                <button id="new-prompt">New Challenge</button>
            </div>
            <script src="challenge.js"></script>
        </div>

        // Code to make the buttons work
        const themes = {
            environment: ['A moss covered forest at dusk', 'The shimmering desert at night', 
                        'A rainy morning in the city', 'Space station green house in full bloom', 
                        'A thriving swampland with black willow trees', 'Glass domed habitat on the moon', 
                        'A lonely 24/7 diner', 'The worlds busiest drive-thru',
                        'Your desk space', 'A secret alley way', 'A planet of purple and blue fields',
                        'A cozy livingroom with overstuffed chairs and overflowing bookshelves',
                        'A Japanese Garden during the winter', 'A cave being excavated', 
                        'The eye of the storm'
                         ],
            character: ['Detective on the cusp of a breakthrough', 'A lonely scientist', 'A nervous pilot',
                         'A friendly doctor', 'An excited child', 'A computer science student',
                         'A young musician playing on the street', 'A bustling market full of vendors',
                         'An elderly couple on the beach', 'A single cook in the kitchen during dinner rush',
                         'A sculptor mid masterpiece', 'Guardian of the ancient library', 'WWII spy at a checkpoint',
                         'A collector and their collection'
                        ],
            creature: ['Dragons sleeping in places you expect birds', 'A mischievous unicorn', 
                        'Robots doing grocery shopping', 'An alien holding a bouquet of mismatched flowers', 
                        'Do wendigo climb trees? Nah', 'Mothman smacking against a street light', 
                        'A whale shark from above', 'The favorite cat at the cat cafe', 
                        'Ancient owl guardian at the crumbling gates', 'A flash of lightning revealing the form of the Thunderbird',
                        'A zebra hunting a lion', 'A fox playing in a meadow'
                        ],
            object: ['A useless magic wand', 'A spaceship at a gas stop', 
                     'Treasure chest turned crib', 'A half built time machine', 
                     'A broken hairbrush', 'Ghost catching thermos :)', 'A shield used for everything but defense', 
                     'An explorers coat rack', 'A vintage typewriter on a desk surrounded by unfinished works',
                     'A collection of antique keys', 'A weathered telescope facing the sole window of a cluttered attic'
                    ],
        };
        
        const promptEl = document.getElementById('prompt');
        const newPromptBtn = document.getElementById('new-prompt');
        
        // Initialize the prompt with a default theme (could change to prompts list above?)
        let currentTheme = 'environment';
        generateNewPrompt();
        
        // Set up event listeners for theme buttons
        document.querySelectorAll('.pBtns').forEach(btn => {
        btn.addEventListener('click', () => {
            currentTheme = btn.textContent.toLowerCase();
            generateNewPrompt();
        });
        });
        
        // Generate a new prompt for the current theme
        function generateNewPrompt() {
        const theme = themes[currentTheme];
        const randomItem = theme[Math.floor(Math.random() * theme.length)];
        promptEl.textContent = `${randomItem}`;
        }
        
        // Set up event listener for new prompt button
        newPromptBtn.addEventListener('click', generateNewPrompt);
    ); 
};

export default DailyChallenge;
