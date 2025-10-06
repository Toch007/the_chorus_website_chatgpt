"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

interface VideoGalleryProps {
  videos?: {
    id: string;
    title: string;
    description: string;
    thumbnail?: string;
    src: string;
    type: "youtube" | "local";
    duration?: string;
  }[];
  featuredVideo?: {
    title: string;
    description: string;
    src: string;
    type: "youtube" | "local";
    thumbnail?: string;
  };
}

const defaultVideos = [
  {
    id: "1",
    title: "The Chorus Abuja Live Performance",
    description: "Experience our signature harmonies in this captivating live performance",
    src: "https://www.youtube.com/embed/FfC_dieiw6A?si=Rn7d7AlhXGAYxFoW",
    type: "youtube" as const,
    duration: "4:32",
    thumbnail: "/images/gallery8.jpeg"
  },
  {
    id: "2", 
    title: "Behind the Scenes",
    description: "Get a glimpse of our preparation and rehearsal process",
    src: "/videos/chorus-video.mp4",
    type: "local" as const,
    duration: "2:15",
    thumbnail: "/images/20220828_174319.jpg"
  },
  {
    id: "3",
    title: "Community Outreach Performance", 
    description: "Bringing music to the community - our mission in action",
    src: "/videos/chorus-video2.mp4",
    type: "local" as const,
    duration: "3:45",
    thumbnail: "/images/20220828_183913.jpg"
  }
];

export default function VideoGallery({ videos = defaultVideos, featuredVideo }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState(featuredVideo || videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoSelect = (video: typeof videos[0]) => {
    setSelectedVideo(video);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const resetVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      videoRef.current.pause();
    }
  };

  const enterFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPlaying, showControls]);

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              Experience Our Musical Journey
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              From intimate rehearsals to grand performances, witness the passion and 
              excellence that defines The Chorus Abuja through our video collection.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-6 rounded-full"></div>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <Reveal>
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="relative aspect-video bg-black">
                  {selectedVideo.type === "youtube" ? (
                    <iframe
                      src={selectedVideo.src}
                      title={selectedVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    <div 
                      className="relative w-full h-full group cursor-pointer"
                      onClick={() => setShowControls(true)}
                      onMouseEnter={() => setShowControls(true)}
                      onMouseLeave={() => isPlaying && setShowControls(false)}
                    >
                      <video
                        ref={videoRef}
                        src={selectedVideo.src}
                        poster={selectedVideo.thumbnail}
                        className="w-full h-full object-cover"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={() => setIsPlaying(false)}
                      />
                      
                      {/* Custom Video Controls */}
                      <AnimatePresence>
                        {showControls && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/20 flex items-center justify-center"
                          >
                            {/* Center Play Button */}
                            <button
                              onClick={togglePlay}
                              className="bg-white/90 hover:bg-white text-blue-900 rounded-full p-6 shadow-2xl transition-all hover:scale-110"
                            >
                              {isPlaying ? (
                                <Pause size={32} />
                              ) : (
                                <Play size={32} className="ml-1" />
                              )}
                            </button>

                            {/* Bottom Controls */}
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={togglePlay}
                                  className="text-white hover:text-blue-300 transition-colors"
                                >
                                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                </button>
                                <button
                                  onClick={toggleMute}
                                  className="text-white hover:text-blue-300 transition-colors"
                                >
                                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                </button>
                                <button
                                  onClick={resetVideo}
                                  className="text-white hover:text-blue-300 transition-colors"
                                >
                                  <RotateCcw size={18} />
                                </button>
                              </div>
                              
                              <button
                                onClick={enterFullscreen}
                                className="text-white hover:text-blue-300 transition-colors"
                              >
                                <Maximize size={18} />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedVideo.description}
                  </p>
                  {selectedVideo.duration && (
                    <div className="mt-4 inline-flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      Duration: {selectedVideo.duration}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Video Playlist */}
          <div className="space-y-6">
            <Reveal delay={0.2}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Video Collection
              </h3>
            </Reveal>

            {videos.map((video, index) => (
              <Reveal key={video.id} delay={0.1 * (index + 3)}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleVideoSelect(video)}
                  className={`cursor-pointer p-4 rounded-xl transition-all ${
                    selectedVideo.id === video.id
                      ? "bg-blue-50 border-2 border-blue-200 shadow-md"
                      : "bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="relative w-24 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      {video.thumbnail && (
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play size={16} className="text-white" />
                      </div>
                      {video.duration && (
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                          {video.duration}
                        </div>
                      )}
                    </div>

                    {/* Video Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold text-sm leading-tight mb-1 ${
                        selectedVideo.id === video.id ? "text-blue-900" : "text-gray-900"
                      }`}>
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}

            {/* Call to Action */}
            <Reveal delay={0.5}>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
                <h4 className="font-bold text-lg mb-3">
                  Want to See More?
                </h4>
                <p className="text-blue-100 text-sm mb-4">
                  Subscribe to our channel for the latest performances and behind-the-scenes content.
                </p>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm">
                  Subscribe Now
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}