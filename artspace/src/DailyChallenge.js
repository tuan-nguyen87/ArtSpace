import React, {useState, useEffect} from "react";
import "./styles/DailyChallenge.css";

const DailyChallenge = () => {
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

    const [currentTheme, setCurrentTheme] = useState('environment');
    const [prompt, setPrompt] = useState('');

    useEffect(() => {
        generateNewPrompt();
    }, [currentTheme]); // Trigger generation when theme changes

    function generateNewPrompt() {
        const theme = themes[currentTheme];
        const randomItem = theme[Math.floor(Math.random() * theme.length)];
        setPrompt(randomItem);
    }

    return(
        <div className="challenge-container">
            <div class="prompt-topics">
                <button type="button" className="pBtns" onClick={() => setCurrentTheme('environment')}>
                    Environment
                </button>
                <button type="button" className="pBtns" onClick={() => setCurrentTheme('character')}>
                    Character
                </button>
                <button type="button" className="pBtns" onClick={() => setCurrentTheme('creature')}>
                    Creature
                </button>
                <button type="button" className="pBtns" onClick={() => setCurrentTheme('object')}>
                    Object
                </button>
            </div>
            <div className="prompt-box">
                <h1>Challenge of the Day</h1>
                <p id="prompt">{prompt}</p>
                <br />
                <button type="button" onClick={generateNewPrompt}>New Challenge</button>
            </div>
        </div>
    ); 
};

export default DailyChallenge;
