"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Users, Music, Camera, Heart } from "lucide-react";
import Reveal from "@/components/Reveal";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

// Gallery images with authentic choir photos
const galleryImages = [
  {
    src: "/images/gallery11.jpeg",
    alt: "Choir Performance 2022",
    category: "performances"
  },
  {
    src: "/images/gallery7.jpeg", 
    alt: "Choir Group Photo 2022",
    category: "community"
  },
  {
    src: "/images/gallery3.jpg",
    alt: "Rehearsal Session September 2022", 
    category: "rehearsals"
  },
  {
    src: "/images/Resurrection2.jpeg",
    alt: "Choir in Dramatic Attire",
    category: "performances"
  },
  {
    src: "/images/solomon-1.jpg",
    alt: "Solomon Concert Preparation",
    category: "events"
  },
  {
    src: "/images/chorus_2.jpg",
    alt: "The Chorus Abuja Logo",
    category: "branding"
  },
  {
    src: "/images/gallery8.jpeg",
    alt: "12th Mass Performance",
    category: "performances"
  },
  {
    src: "/images/Creation Concert.jpg",
    alt: "Our First Concert Ever",
    category: "community"
  },
  {
    src: "/images/127476857-choir-guide-music-vector-illustration.jpg",
    alt: "Music Guide Illustration", 
    category: "educational"
  }
];

const categories = [
  { id: "all", label: "All Photos", icon: Users },
  { id: "performances", label: "Performances", icon: Music },
  { id: "community", label: "Community", icon: Heart },
  { id: "rehearsals", label: "Rehearsals", icon: Users },
  { id: "events", label: "Events", icon: Music }
];

export default function ImageGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { shouldReduceAnimations, shouldPreloadImages } = usePerformanceMonitor();

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const maxIndex = filteredImages.length - 1;
    if (direction === 'prev') {
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : maxIndex);
    } else {
      setSelectedImage(selectedImage < maxIndex ? selectedImage + 1 : 0);
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6 md:px-20" id="gallery">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal direction="up" delay={0.1}>
            <div className="flex justify-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
              Our Musical Journey
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Four years of growth, harmony, and community. These moments capture the heart 
              of what makes The Chorus Abuja special.
            </p>
          </Reveal>

          {/* Category Filters */}
          <Reveal delay={0.4}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isActive = selectedCategory === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-blue-50 active:bg-blue-100 border border-gray-200'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredImages.map((image, index) => (
            <Reveal key={index} delay={shouldReduceAnimations ? 0 : 0.5 + (index % 3) * 0.1}>
              <div
                className={`group relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  shouldReduceAnimations ? '' : 'transform hover:-translate-y-1'
                }`}
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={`object-cover ${shouldReduceAnimations ? '' : 'group-hover:scale-110'} transition-transform duration-500`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 6}
                  quality={85}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                <div className={`absolute bottom-4 left-4 right-4 transform ${shouldReduceAnimations ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'} transition-transform duration-300`}>
                  <p className="text-white font-semibold text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full backdrop-blur-sm">
                    {image.alt}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Statistics */}
        <Reveal delay={0.8}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">
              Capturing Our Growth
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Every photo tells a story of dedication, friendship, and musical excellence. 
              Join us and become part of this beautiful journey.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">4</div>
                <div className="text-sm text-blue-100">Years of Music</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm text-blue-100">Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">8</div>
                <div className="text-sm text-blue-100">Concerts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">1500+</div>
                <div className="text-sm text-blue-100">Audience Reached</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-40 rounded-full p-3 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-40 rounded-full p-3 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-40 rounded-full p-3 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={filteredImages[selectedImage].src}
                  alt={filteredImages[selectedImage].alt}
                  width={800}
                  height={600}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
                
                {/* Image Caption */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-center backdrop-blur-sm">
                  <p className="font-semibold">{filteredImages[selectedImage].alt}</p>
                  <p className="text-sm text-gray-300">
                    {selectedImage + 1} of {filteredImages.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}