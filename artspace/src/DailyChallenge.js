import React, {useState, useEffect} from "react";
import "./styles/DailyChallenge.css";

const DailyChallenge = () => {
// Themes and their respective prompts
    const themes = {
        environment: ['A moss covered forest at dusk', 'The shimmering desert at night', 
                    'A rainy morning in the city', 'Space station green house in full bloom', 
                    'A thriving swampland with black willow trees', 'Glass domed habitat on the moon', 
                    'A lonely 24/7 diner', 'The worlds busiest drive-thru',
                    'Your desk space', 'A secret alley way', 'A planet of purple and blue fields',
                    'A cozy livingroom with overstuffed chairs and overflowing bookshelves',
                    'A Japanese Garden during the winter', 'A cave being excavated', 
                    'The eye of the storm', 'A koi pond in the middle of a shopping district',
                    'A fruiting tree in a lush, cottage style garden',
                    'A train gliding across open ocean', 'A playground on another planet',
                    'A thriving coral reef bordering an ocean cliff'
                    ],
        character: ['Detective on the cusp of a breakthrough', 'A lonely scientist', 'A nervous pilot',
                    'A friendly doctor', 'An excited child', 'A computer science student',
                    'A young musician playing on the street', 'A bustling market full of vendors',
                    'An elderly couple on the beach', 'A single cook in the kitchen during dinner rush',
                    'A sculptor mid masterpiece', 'Guardian of the ancient library', 'WWII spy at a checkpoint',
                    'A collector and their collection', 'A street musician with an audience of one',
                    'A bookworm lost in an imaginary world', 'A gardener loved by bees',
                    'An artist in their studio, surrounded by projects',
                    'A teacher on their lunch break', 'A child checking for monsters at night',
                    'A baker waiting in front of a working oven',
                    'An actor confused by their script'
                    ],
        creature: ['Dragons sleeping in places you expect birds', 'A mischievous unicorn', 
                    'Robots doing grocery shopping', 'An alien holding a bouquet of mismatched flowers', 
                    'Do wendigo climb trees? Nah', 'Mothman smacking against a street light', 
                    'A whale shark from above', 'The favorite cat at the cat cafe', 
                    'Ancient owl guardian at the crumbling gates', 'A flash of lightning revealing the form of the Thunderbird',
                    'A zebra hunting a lion', 'A fox playing in a meadow',
                    'A dragon using a cloud as a perch', 'A phoenix that has just been reborn',
                    'A nesting penguin', 'An owl mid swoop', 'A squadron of manta rays migrating',
                    'A glowing forest sprite at a cut down tree', 'Your magical familiar',
                    'A group of garden gnomes stealing flower pots',
                    'A less than majestic bald eagle', 'Otters holding hands to sleep',
                    'A beautiful swan dancing with its mate'
                    ],
        object: ['A useless magic wand', 'A spaceship at a gas stop', 
                'Treasure chest turned crib', 'A half built time machine', 
                'A broken hairbrush', 'Ghost catching thermos :)', 'A shield used for everything but defense', 
                'An explorers coat rack', 'A vintage typewriter on a desk surrounded by unfinished works',
                'A collection of antique keys', 'A weathered telescope facing the sole window of a cluttered attic',
                'An abandoned statue hidden in the woods', 'A wish granting paper lantern',
                'A steaming tea cup on a window sill', 'A quilt that tells a heartfelt story',
                'A bicycle with too many seats', 'The blue prints to a vintage camera',
                'A wilting potted plant', 'A well loved pocket watch passed from generation to generation',
                'A colorful jukebox blasting a tune', 'The most gaudy of desk lamps'
                ],
    };
    
    // State variables
    const [currentTheme, setCurrentTheme] = useState('environment');
    const [prompt, setPrompt] = useState('');

    // Effect hook to generate a new prompt when the theme changes
    useEffect(() => {
        generateNewPrompt();
    }, [currentTheme]); 

    // Function to generate a new prompt based on the current theme
    function generateNewPrompt() {
        const theme = themes[currentTheme];
        const randomItem = theme[Math.floor(Math.random() * theme.length)];
        setPrompt(randomItem);
    }

    return(
        <div className="challenge-bg">
            <div class='challenge-container'>
                {/* New how to for clarity on the purpose of the page */}
                <div class ="howto">
                    <h1>Art Idea Generator</h1>
                    <p>
                        A series of randomized prompts to help artists kick artblock 
                        and inspire new creations! Click on one of the prompt theme 
                        buttons to get the ball rolling, and don't hesitate to try 
                        something new! Click on "New Challenge" to generate a new, 
                        themed prompt. Have fun!
                    </p>
                </div>
                {/* New how to for clarity on the purpose of the page */}
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
                    {/* Could add a button that allows users to contribute their own prompts? */}
                </div>
                <div class="prompt-box">
                    <h1>Challenge of the Day</h1>
                    <p id="prompt">{prompt}</p>
                    <br />
                    <button type="button" onClick={generateNewPrompt}>New Challenge</button>
                </div>
            </div>
        </div>
    ); 
};

export default DailyChallenge;
