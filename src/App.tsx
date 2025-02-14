import React, { useState } from 'react';
import { Moon, Star, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';

// Custom heart cursor implementation using SVG
// This creates a heart-shaped cursor that follows the mouse throughout the application
const cursorStyle = `
  * {
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23ff69b4'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>") 12 12, auto !important;
  }
`;

// Interface definition for nickname structure
// This ensures type safety when working with nickname data
interface Nickname {
  name: string;
  reason: string;
  position: { x: number; y: number };
}

// Array of predefined nicknames with their explanations and positions
// These will be displayed as interactive stars in the night sky section
const nicknames: Nickname[] = [
  { name: "Sweetie", reason: "Because you're the sweetest person I know", position: { x: 20, y: 30 } },
  { name: "Princess", reason: "Because you deserve to be treated like royalty", position: { x: 60, y: 15 } },
  { name: "Sunshine", reason: "Because you light up my world", position: { x: 80, y: 40 } },
  { name: "Angel", reason: "Because you're a blessing in my life", position: { x: 40, y: 60 } },
  { name: "Jaan", reason: "Because you're my life", position: { x: 70, y: 70 } },
];

// Special nickname that appears when interacting with the moon
// Contains a more elaborate message of affection
const specialNickname = {
  name: "My Everything",
  message: "You're the most precious person in my life. Every moment with you is a blessing, and I cherish you more than words can express."
};

function App() {
  // State management for various interactive elements
  const [selectedStar, setSelectedStar] = useState<Nickname | null>(null);
  const [showMoonMessage, setShowMoonMessage] = useState(false);
  const [hugStrength, setHugStrength] = useState(5);
  const [showHugMessage, setShowHugMessage] = useState(false);
  const [proposalAccepted, setProposalAccepted] = useState(false);
  const [letterTyped, setLetterTyped] = useState(false);


  // Effect hook to add and remove the custom cursor style
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = cursorStyle;
    document.head.appendChild(styleElement);
    
    // Cleanup function to remove the style when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Event handlers for interactive elements
  const handleStarHover = (nickname: Nickname) => {
    setSelectedStar(nickname);
  };

  const handleStarLeave = () => {
    setSelectedStar(null);
  };

  const handleHugStrengthChange = (value: number) => {
    setHugStrength(value);
    setShowHugMessage(false);
    // Delayed message display for better user experience
    setTimeout(() => {
      setShowHugMessage(true);
    }, 2000);
  };

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-auto overflow-x-hidden">
      {/* Valentine's Proposal Section */}
      <section className="snap-start  h-screen relative overflow-hidden">
        {/* Romantic background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://img.freepik.com/free-photo/textile-valentines-day-hearts-pink_1220-3829.jpg?t=st=1739526233~exp=1739529833~hmac=afbff84ea911ad5db98390cd739e7c8721b0af447947fda6d594860949f95922&w=996')`,
            opacity: 0.8
          }}
        />

        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/50 to-transparent" />

        {/* Main content container */}
       <div className="relative z-10 h-full w-full flex justify-start items-center pl-64">


          <div className="ml-16 max-w-xl">
            {/* Animated image container */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-8"
            >
              {proposalAccepted ? (
                <div className="flex flex-col gap-4">
                  <img
                    src="https://gifdb.com/images/thumbnail/cute-cat-kiss-animated-hug-j3uoo2pgfxti6d2y.gif"
                    alt="Cute cats hugging"
                    className="w-64 h-64 object-cover rounded-full shadow-lg"
                  />

                </div>
              ) : (
              <img
                    src="https://sumitjha.sirv.com/image2.gif"
                    alt="Celebration"
                    className="w-64 h-64 object-cover rounded-full shadow-lg"
                  />

              )}
            </motion.div>

            {/* Conditional rendering based on proposal acceptance */}
            {!proposalAccepted ? (
              <>
                <motion.h1
                  animate={{
                    textShadow: ["0 0 5px #ff69b4", "0 0 20px #ff69b4", "0 0 5px #ff69b4"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl font-handwriting text-white mb-8"
                >
                  Will you be my Valentine?
                </motion.h1>
                <div className="space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="px-6 py-3 bg-pink-500 text-white rounded-full font-semibold shadow-lg"
                    onClick={() => setProposalAccepted(true)}
                  >
                    Yes, of course!
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="px-6 py-3 bg-pink-500 text-white rounded-full font-semibold shadow-lg"
                    onClick={() => setProposalAccepted(true)}
                  >
                    Yes, definitely!
                  </motion.button>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center text-4xl font-handwriting text-white mt-4"
              >
                I Love You ❤️
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Stars Section */}
      <section className="snap-start h-screen bg-gradient-to-b from-[#0a192f] to-[#112240] relative overflow-hidden">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-10"
        >
          <h2 className="text-3xl font-handwriting text-white mb-2">Nicknames Dictionary</h2>
          <p className="text-pink-200 text-sm">Hover over the stars to discover your special nicknames ✨</p>
        </motion.div>

        {/* Animated background stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Interactive nickname stars */}
        {nicknames.map((nickname, index) => (
          <div
            key={index}
            className="absolute cursor-pointer"
            style={{ left: `${nickname.position.x}%`, top: `${nickname.position.y}%` }}
            onMouseEnter={() => handleStarHover(nickname)}
            onMouseLeave={handleStarLeave}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            >
              <Star className="w-8 h-8 text-yellow-200" fill="rgba(254, 240, 138, 0.5)" />
            </motion.div>
          </div>
        ))}

        {/* Interactive moon element */}
        <motion.div
          className="absolute right-10 top-20 cursor-pointer"
          onMouseEnter={() => setShowMoonMessage(true)}
          onMouseLeave={() => setShowMoonMessage(false)}
          whileHover={{ scale: 1.1 }}
        >
          <Moon className="w-16 h-16 text-yellow-100" fill="rgba(254, 240, 138, 0.3)" />
        </motion.div>

        {/* Star hover message animation */}
        <AnimatePresence>
          {selectedStar && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <div className="relative">
                <Heart className="w-48 h-48 text-pink-500" fill="#ec4899" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="text-xl font-bold">{selectedStar.name}</h3>
                  <p className="text-sm text-center px-8">{selectedStar.reason}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Moon hover message animation */}
        <AnimatePresence>
          {showMoonMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <div className="relative">
                <Heart className="w-64 h-64 text-pink-500" fill="#ec4899" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="text-2xl font-bold mb-2">{specialNickname.name}</h3>
                  <p className="text-lg text-center px-12">{specialNickname.message}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
{/* Love Letter Section */}
  <section className="snap-start h-screen flex items-center justify-center p-4 relative">
    <div
      className="absolute inset-0 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=3786&auto=format&fit=crop')`,
      }}
    />
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl max-w-2xl w-full relative z-10"
    >
      <div className="font-handwriting text-gray-800 text-lg whitespace-pre-line">
        {!letterTyped ? (
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  "My Dearest Love,\n\n" +
                  "Every day with you feels like a beautiful dream come true. " +
                  "Your smile brightens my darkest days, and your love gives me strength I never knew I had. " +
                  "You're not just my partner, you're my best friend, my confidante, and my soulmate.\n\n" +
                  "I love you more with each passing moment.\n\n" +
                  "Forever Yours ❤️"
                )
                .callFunction(() => {
                  setLetterTyped(true);
                })
                .start();
            }}
            options={{
              delay: 50,
              cursor: '',
            }}
          />
        ) : (
          <div className="animate-pulse">
            My Dearest Love,
            
            Every day with you feels like a beautiful dream come true. Your smile brightens my darkest days, and your love gives me strength I never knew I had. You're not just my partner, you're my best friend, my confidante, and my soulmate.
            
            I love you more with each passing moment.
            
            Forever Yours ❤️
          </div>
        )}
      </div>
    </motion.div>
  </section>

    

      {/* Hug Meter Section */}
      <section className="snap-start h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 to-purple-600">
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold mb-8 text-white">Tell Me How Tight You Want Your Hug!</h2>
          <div className="relative w-80 mx-auto mb-8">
            <input
              type="range"
              min="1"
              max="10"
              value={hugStrength}
              onChange={(e) => handleHugStrengthChange(parseInt(e.target.value))}
              className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="mt-4">
              <motion.div
                animate={{
                  scale: [1, hugStrength / 5, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                }}
              >
                <Heart 
                  className="w-16 h-16 mx-auto" 
                  fill={`rgba(236, 72, 153, ${hugStrength / 10})`}
                />
              </motion.div>
            </div>
          </div>
          <AnimatePresence>
            {showHugMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-handwriting mt-8 text-white"
              >
                Jaldi se aa jao, khud ke!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

export default App;