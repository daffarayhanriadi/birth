import React, { useState, useEffect, useRef } from 'react';
import { Heart, Camera, Music, Play, Pause, Gift, Star, Smile, Zap, Coffee, TowerControl as GameController2, Pizza, Sparkles } from 'lucide-react';

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const memoryPhotos = [
    {
      url: '../public/photos/img1.jpg',
      caption: 'That time we got lost but found the best ice cream shop!'
    },
    {
      url: '../public/photos/img2.jpg',
      caption: 'Our epic karaoke night - sorry neighbors! 🎤'
    },
    {
      url: '../public/photos/img3.jpg',
      caption: 'Beach day chaos - sand everywhere for weeks!'
    },
    {
      url: '../public/photos/img4.jpg',
      caption: 'Dancing like nobody was watching (but everyone was)'
    },
    {
      // url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800',
      url: '../public/photos/img5.jpg',
      caption: 'Coffee dates and endless gossip sessions ☕'
    }
  ];

  const goofyReasons = [
    {
      icon: <Smile className="text-yellow-500" size={32} />,
      reason: "You laugh at your own jokes before telling them to anyone else"
    },
    {
      icon: <Pizza className="text-orange-500" size={32} />,
      reason: "You eat pizza with a fork and knife like a fancy person"
    },
    {
      icon: <Coffee className="text-amber-600" size={32} />,
      reason: "You talk to your plants and genuinely expect them to respond"
    },
    {
      icon: <GameController2 className="text-purple-500" size={32} />,
      reason: "You celebrate winning at board games like you won the Olympics"
    },
    {
      icon: <Star className="text-pink-500" size={32} />,
      reason: "You make up songs about literally everything you do"
    },
    {
      icon: <Zap className="text-blue-500" size={32} />,
      reason: "You have strong opinions about which superhero would win at mini golf"
    },
    {
      icon: <Heart className="text-red-500" size={32} />,
      reason: "You cry at commercials but not at sad movies"
    },
    {
      icon: <Gift className="text-green-500" size={32} />,
      reason: "You wrap presents like you're in a race against time"
    },
    {
      icon: <Sparkles className="text-indigo-500" size={32} />,
      reason: "You have a different weird dance for every day of the week"
    },
    {
      icon: <Music className="text-teal-500" size={32} />,
      reason: "You sing 'Happy Birthday' to yourself in the mirror every morning"
    }
  ];

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % memoryPhotos.length);
    }, 4000);

    return () => clearInterval(imageTimer);
  }, [memoryPhotos.length]);

  useEffect(() => {
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(confettiTimer);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log('Audio play failed:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const ConfettiAnimation = () => (
    <div className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-1000 ${showConfetti ? 'opacity-100' : 'opacity-0'}`}>
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: ['#ff6b9d', '#ffd93d', '#6bcf7f', '#4d96ff', '#9b59b6', '#e67e22'][Math.floor(Math.random() * 6)],
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}
    </div>
  );

  const FloatingIcons = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-20 left-10 animate-bounce text-yellow-400" style={{ animationDelay: '0s' }}>
        <Star size={24} />
      </div>
      <div className="absolute top-40 right-20 animate-bounce text-pink-400" style={{ animationDelay: '1s' }}>
        <Heart size={20} />
      </div>
      <div className="absolute bottom-40 left-20 animate-bounce text-blue-400" style={{ animationDelay: '2s' }}>
        <Sparkles size={28} />
      </div>
      <div className="absolute top-60 right-40 animate-bounce text-green-400" style={{ animationDelay: '0.5s' }}>
        <Gift size={22} />
      </div>
      <div className="absolute bottom-60 right-10 animate-bounce text-purple-400" style={{ animationDelay: '1.5s' }}>
        <Smile size={26} />
      </div>
      <div className="absolute top-80 left-40 animate-bounce text-orange-400" style={{ animationDelay: '2.5s' }}>
        <Pizza size={24} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200 relative overflow-hidden">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        {/* <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
        <source src="https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg" type="audio/ogg" /> */}
        <source src="https://github.com/daffarayhanriadi/birth/blob/main/public/song/birthday-song.mp3" type="audio/mpeg" />
        {/* Fallback for browsers that don't support the above formats */}
        Your browser does not support the audio element.
      </audio>

      <ConfettiAnimation />
      <FloatingIcons />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-yellow-300 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-blue-300 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-green-300 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 text-center py-12">
        <div className="animate-bounce mb-6">
          <div className="text-8xl mb-4">🎉</div>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 animate-pulse">
          HAPPY BIRTHDAY!
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          To My Truly Wonderful Best Friend 😏🤣
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-4 font-medium">
          Get ready for the weirdest birthday celebration ever! 
          Because normal is boring haha, hope you like this very simple celebration 😅
        </p>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Music Control */}
        <section className="mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 max-w-md mx-auto border-4 border-yellow-300">
            <div className="text-center">
              <Music className={`mx-auto text-purple-600 mb-3 ${isPlaying ? 'animate-bounce' : ''}`} size={40} />
              <h3 className="text-xl font-bold text-gray-800 mb-4">Birthday Vibes 🎵</h3>
              <button
                onClick={toggleMusic}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-bold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg flex items-center space-x-2 mx-auto"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                <span>{isPlaying ? 'Pause the Party' : 'Start the Party!'}</span>
              </button>
              <p className="text-sm text-gray-600 mt-2">
                {isPlaying ? '🎶 Party mode activated!' : '🎵 Ready to celebrate?'}
              </p>
            </div>
          </div>
        </section>

        {/* Photo Memories Section */}
        {/* <section className="mb-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-5xl mx-auto border-4 border-blue-300">
            <div className="text-center mb-8">
              <Camera className="mx-auto text-pink-600 mb-4" size={48} />
              <h2 className="text-4xl font-black text-gray-800 mb-2">Our Epic Adventures! 📸</h2>
              <p className="text-gray-600 text-lg">Proof that we're the most fun duo ever!</p>
            </div>
            
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-400">
                <img
                  src={memoryPhotos[currentImageIndex].url}
                  alt={memoryPhotos[currentImageIndex].caption}
                  className="w-full h-full object-cover transition-all duration-1000 hover:scale-105"
                  // className="w-full h-full object-cover rounded-xl shadow-md"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white text-xl font-bold">{memoryPhotos[currentImageIndex].caption}</p>
                </div>
              </div>
              
              <div className="flex justify-center mt-6 space-x-3">
                {memoryPhotos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                      index === currentImageIndex 
                        ? 'bg-pink-500 border-pink-600 scale-125' 
                        : 'bg-white border-gray-300 hover:bg-pink-200 hover:border-pink-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* 10 Goofy Reasons Section */}
        {/* <section className="mb-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-6xl mx-auto border-4 border-green-300">
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">🤡</div>
              <h2 className="text-4xl font-black text-gray-800 mb-4">
                10 Reasons Why You're the Goofiest Best Friend Ever!
              </h2>
              <p className="text-gray-600 text-lg">
                Scientifically proven facts about your wonderfully weird personality!
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {goofyReasons.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-pink-50 to-yellow-50 rounded-2xl p-6 border-3 border-dashed border-pink-300 transform hover:scale-105 hover:rotate-1 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-white rounded-full p-3 shadow-lg">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-black text-pink-600 mb-2">#{index + 1}</div>
                      <p className="text-gray-700 font-semibold text-lg leading-relaxed">
                        {item.reason}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Birthday Wishes Section */}
        <section className="mb-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-4xl mx-auto border-4 border-purple-300">
            <div className="text-center">
              <div className="text-6xl mb-6">🎂</div>
              <h2 className="text-4xl font-black text-gray-800 mb-6">Birthday Wishes From the Heart! 💝</h2>
              <div className="space-y-6 text-left max-w-3xl mx-auto">
                <div className="bg-gradient-to-r from-pink-100 to-yellow-100 rounded-2xl p-6 border-l-4 border-pink-500">
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    🌟 Semoga hari-harimu secerah dan sepositif sikap baik dan kuat yang selalu dirimu tunjukin tiap hari.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl p-6 border-l-4 border-blue-500">
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    🎈 Selamat ngelewatin satu tahun lagi dengan penuh keberanian, semangat, dan ketulusan (baik pas lagi tugas maupun di kehidupan sehari-hari).
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-l-4 border-purple-500">
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    💪 Tetap jadi dirimu yang keren kayak sekarang ya. Dunia (dan tim juga pastinya) lebih baik karena ada dirimu.
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                  Happy Birthday, you truly remarkable soul! 🥳
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Heart className="text-red-500 animate-pulse" size={24} />
          <p className="text-gray-700 font-bold text-lg">Made with lots of laughs and love!</p>
          <Heart className="text-red-500 animate-pulse" size={24} />
        </div>
        <p className="text-gray-600 font-medium">
          🎊 Here's to many more years of friendship, fun, and fabulous memories! 🎊
        </p>
        <div className="mt-4 text-4xl animate-bounce">
          🎈🎂🎁
        </div>
      </footer>
    </div>
  );
}

export default App;
