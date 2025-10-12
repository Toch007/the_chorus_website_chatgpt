"use client";

import { useState } from "react";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import Reveal from "@/components/Reveal";

// Video data using your authentic choir content
const videos = [
  {
    id: 1,
    title: "The Chorus Abuja Performance",
    description:
      "Experience our live performance showcasing the harmony and excellence we've built over 4 years.",
    thumbnail: "/images/chorus.jpg",
    videoUrl: "https://www.youtube.com/embed/FfC_dieiw6A?si=Rn7d7AlhXGAYxFoW",
    duration: "3:45",
    category: "performance",
  },
  {
    id: 2,
    title: "Rehearsal Sessions",
    description:
      "Behind the scenes - see how we prepare for our concerts with dedication and passion.",
    thumbnail: "/images/20220911_170221.jpg",
    videoUrl: "/videos/chorus-video2.mp4", // Local video
    duration: "2:30",
    category: "rehearsal",
  },
];

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      className="bg-gradient-to-b from-white via-blue-50/50 to-white py-20 lg:py-24 px-6 md:px-20"
      id="videos"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal direction="up" delay={0.1}>
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Music className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
              See Us in Action
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
              Our music speaks louder than words. Watch glimpses of our live
              performances and experience the passion that drives The Chorus
              Abuja.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-8">
          {/* Main Video Player - Larger on XL screens */}
          <div className="xl:col-span-3 lg:col-span-2">
            <Reveal direction="left" delay={0.4}>
              <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                {activeVideo === 0 ? (
                  // YouTube Video
                  <iframe
                    src={videos[activeVideo].videoUrl}
                    title={videos[activeVideo].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  // Local Video with Custom Controls
                  <video
                    src={videos[activeVideo].videoUrl}
                    poster={videos[activeVideo].thumbnail}
                    controls
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                )}

                {/* Video Info Overlay - Enhanced for large screens */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 lg:p-8">
                  <h3 className="text-white text-xl lg:text-2xl font-bold mb-2 lg:mb-3">
                    {videos[activeVideo].title}
                  </h3>
                  <p className="text-gray-200 text-sm lg:text-base leading-relaxed">
                    {videos[activeVideo].description}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-xs lg:text-sm text-blue-300 bg-blue-900/50 px-3 py-1 rounded-full">
                      Duration: {videos[activeVideo].duration}
                    </span>
                    <span className="text-xs lg:text-sm text-gray-300 capitalize">
                      {videos[activeVideo].category}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Enhanced Playlist Sidebar */}
          <div className="xl:col-span-1 lg:col-span-1">
            <Reveal direction="right" delay={0.6}>
              <div className="bg-white rounded-2xl shadow-lg p-6 lg:sticky lg:top-8">
                <div className="flex items-center mb-6">
                  <Music className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900">
                    Our Videos
                  </h3>
                  <span className="ml-auto text-sm text-gray-500">
                    {videos.length} videos
                  </span>
                </div>

                <div className="space-y-3 lg:space-y-4">
                  {videos.map((video, index) => (
                    <div
                      key={video.id}
                      onClick={() => setActiveVideo(index)}
                      className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                        activeVideo === index
                          ? "ring-2 ring-blue-500 shadow-lg bg-blue-50"
                          : "hover:shadow-md active:shadow-lg bg-white hover:bg-gray-50"
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-video">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />

                        {/* Playing Indicator */}
                        {activeVideo === index && isPlaying ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="bg-blue-600 rounded-full p-2">
                              <Volume2 className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 group-active:bg-black/30 transition-colors">
                            <div className="bg-white/90 rounded-full p-3 group-hover:bg-white group-active:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
                              <Play className="w-5 h-5 text-gray-900 ml-0.5" />
                            </div>
                          </div>
                        )}

                        {/* Duration */}
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="p-3 lg:p-4">
                        <h4
                          className={`font-semibold text-sm lg:text-base mb-1 ${
                            activeVideo === index
                              ? "text-blue-600"
                              : "text-gray-900"
                          }`}
                        >
                          {video.title}
                        </h4>
                        <p className="text-gray-600 text-xs lg:text-sm line-clamp-2 leading-relaxed">
                          {video.description}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              activeVideo === index
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {video.category}
                          </span>
                          {activeVideo === index && (
                            <div className="flex items-center text-xs text-blue-600">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
                              Now Playing
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced Call to Action */}
                <div className="mt-8 p-4 lg:p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl text-white">
                  <h4 className="font-bold mb-2 lg:text-lg">
                    Join Our Musical Journey
                  </h4>
                  <p className="text-sm lg:text-base text-blue-100 mb-4 leading-relaxed">
                    Experience the harmony firsthand. Be part of creating
                    moments that touch hearts and souls.
                  </p>
                  <a
                    href="#join"
                    className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-50 active:bg-blue-100 transition-colors text-center shadow-lg"
                  >
                    🎤 Join The Chorus
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
