"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Play, Film } from 'lucide-react';

// MediaItemType defines the structure of a media item
export interface MediaItemType {
    id: number;
    type: string;
    title: string;
    desc: string;
    url: string;
    span: string;
    youtubeId?: string;
    thumbnailUrl?: string;
    startSeconds?: number;
}

// MediaItem component renders either a video or image based on item.type
const MediaItem = ({ item, className, onClick }: { item: MediaItemType, className?: string, onClick?: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInView(entry.isIntersecting);
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    useEffect(() => {
        let mounted = true;

        const handleVideoPlay = async () => {
            if (!videoRef.current || !isInView || !mounted) return;

            try {
                if (videoRef.current.readyState >= 3) {
                    setIsBuffering(false);
                    await videoRef.current.play();
                } else {
                    setIsBuffering(true);
                    await new Promise((resolve) => {
                        if (videoRef.current) {
                            videoRef.current.oncanplay = resolve;
                        }
                    });
                    if (mounted) {
                        setIsBuffering(false);
                        await videoRef.current.play();
                    }
                }
            } catch (error) {
                console.warn("Video playback failed:", error);
            }
        };

        if (isInView) {
            handleVideoPlay();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }

        return () => {
            mounted = false;
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
        };
    }, [isInView]);

    if (item.type === 'youtube') {
        const base = item.thumbnailUrl ?? '';
        return (
            <div className={`${className} relative overflow-hidden group/video`}>
                <picture className="block w-full h-full">
                    <source
                        type="image/avif"
                        srcSet={`${base}-mobile.avif 640w, ${base}-desktop.avif 1280w`}
                        sizes="(max-width: 768px) 100vw, 100vw"
                    />
                    <source
                        type="image/webp"
                        srcSet={`${base}-mobile.webp 640w, ${base}-desktop.webp 1280w`}
                        sizes="(max-width: 768px) 100vw, 100vw"
                    />
                    <img
                        src={`${base}-desktop.jpg`}
                        srcSet={`${base}-mobile.jpg 640w, ${base}-desktop.jpg 1280w`}
                        sizes="(max-width: 768px) 100vw, 100vw"
                        alt={item.title}
                        className="image-cover cursor-pointer"
                        onClick={onClick}
                        loading="lazy"
                        decoding="async"
                        width={1280}
                        height={720}
                    />
                </picture>
                {/* Cinematic letterbox bars */}
                <div className="absolute top-0 left-0 right-0 h-[8%] bg-black pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-black pointer-events-none" />

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

                {/* Cinematic badge */}
                <div className="absolute top-[10%] left-4 sm:left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 pointer-events-none">
                    <Film className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                    <span className="text-white text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase font-medium">{item.title}</span>
                    <span className="flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                </div>

                {/* Play button with pulse */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative">
                        <span className="absolute inset-0 rounded-full bg-white/40 animate-ping" />
                        <span className="absolute -inset-2 rounded-full bg-white/20 animate-pulse" />
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center shadow-2xl ring-4 ring-white/30 transition-transform duration-300 group-hover/video:scale-110">
                            <Play className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary-1 ml-1" fill="currentColor" strokeWidth={0} />
                        </div>
                    </div>
                </div>

                {/* Bottom caption */}
                <div className="absolute bottom-[10%] left-0 right-0 px-4 sm:px-6 md:px-8 pointer-events-none">
                    <p className="text-white/90 text-xs sm:text-sm md:text-base font-sans max-w-md drop-shadow-lg">
                        {item.desc}
                    </p>
                </div>
            </div>
        );
    }

    if (item.type === 'video') {
        return (
            <div className={`${className} relative overflow-hidden`}>
                <video
                    ref={videoRef}
                    className="image-cover"
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    preload="auto"
                    style={{
                        opacity: isBuffering ? 0.8 : 1,
                        transition: 'opacity 0.2s',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                    }}
                >
                    <source src={item.url} type="video/mp4" />
                </video>
                {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={className}>
            <picture className="block w-full h-full">
                <source
                    type="image/avif"
                    srcSet={`${item.url}-mobile.avif 640w, ${item.url}-desktop.avif 1280w`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <source
                    type="image/webp"
                    srcSet={`${item.url}-mobile.webp 640w, ${item.url}-desktop.webp 1280w`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <img
                    src={`${item.url}-desktop.jpg`}
                    srcSet={`${item.url}-mobile.jpg 640w, ${item.url}-desktop.jpg 1280w`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt={item.title}
                    className="image-cover cursor-pointer"
                    onClick={onClick}
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={720}
                />
            </picture>
        </div>
    );
};

interface GalleryModalProps {
    selectedItem: MediaItemType;
    isOpen: boolean;
    onClose: () => void;
    setSelectedItem: (item: MediaItemType | null) => void;
    mediaItems: MediaItemType[];
}

const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {
    const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });

    if (!isOpen) return null;

    return (
        <>
            <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                }}
                className="fixed inset-0 w-full min-h-screen sm:h-[90vh] md:h-[100vh] bg-black/90 backdrop-blur-lg 
                          rounded-none overflow-hidden z-[100]"
            >
                <div className="h-full flex flex-col">
                    <div className="flex-1 p-2 sm:p-3 md:p-4 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedItem.id}
                                className="relative w-full aspect-[16/9] max-w-[95%] sm:max-w-[85%] md:max-w-5xl 
                                         h-auto max-h-[80vh] rounded-lg overflow-hidden shadow-2xl"
                                initial={{ y: 20, scale: 0.97, opacity: 0 }}
                                animate={{
                                    y: 0,
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                        mass: 0.5
                                    }
                                }}
                                exit={{
                                    y: 20,
                                    scale: 0.97,
                                    opacity: 0,
                                    transition: { duration: 0.15 }
                                }}
                                onClick={selectedItem.type === 'youtube' ? undefined : onClose}
                            >
                                {selectedItem.type === 'youtube' ? (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${selectedItem.youtubeId}?autoplay=1&rel=0${selectedItem.startSeconds ? `&start=${selectedItem.startSeconds}` : ''}`}
                                        title={selectedItem.title}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                ) : (
                                    <>
                                        <MediaItem item={selectedItem} className="w-full h-full" onClick={onClose} />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8
                                                      bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                            <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-serif">
                                                {selectedItem.title}
                                            </h3>
                                            <p className="text-white/80 text-sm sm:text-base mt-2 max-w-2xl">
                                                {selectedItem.desc}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <motion.button
                    className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 
                              p-3 rounded-full bg-white/10 text-white hover:bg-white/20 
                              backdrop-blur-md transition-colors z-[110]"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X className='w-6 h-6' />
                </motion.button>
            </motion.div>

            <motion.div
                drag
                dragMomentum={false}
                dragElastic={0.1}
                initial={false}
                animate={{ x: dockPosition.x, y: dockPosition.y }}
                onDragEnd={(_, info) => {
                    setDockPosition(prev => ({
                        x: prev.x + info.offset.x,
                        y: prev.y + info.offset.y
                    }));
                }}
                className="fixed z-[120] left-1/2 bottom-8 -translate-x-1/2 touch-none"
            >
                <motion.div
                    className="relative rounded-2xl bg-white/10 backdrop-blur-xl 
                             border border-white/20 shadow-2xl
                             cursor-grab active:cursor-grabbing p-2"
                >
                    <div className="flex items-center space-x-2 px-2 py-1">
                        {mediaItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedItem(item);
                                }}
                                style={{
                                    zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index,
                                }}
                                className={`
                                    relative group
                                    w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 
                                    rounded-xl overflow-hidden 
                                    cursor-pointer hover:z-20 transition-all duration-300
                                    ${selectedItem.id === item.id
                                        ? 'ring-2 ring-white shadow-lg'
                                        : 'opacity-60 hover:opacity-100 hover:ring-2 hover:ring-white/50'}
                                `}
                                initial={{ rotate: index % 2 === 0 ? -5 : 5 }}
                                animate={{
                                    scale: selectedItem.id === item.id ? 1.1 : 1,
                                    rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -5 : 5,
                                    y: selectedItem.id === item.id ? -10 : 0,
                                }}
                                whileHover={{
                                    scale: 1.15,
                                    rotate: 0,
                                    y: -5,
                                    transition: { type: "spring", stiffness: 400, damping: 25 }
                                }}
                            >
                                <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[]
    title: string
    description: string
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
    const [items, setItems] = useState(mediaItems);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedItem !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [selectedItem]);

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="mb-8 md:mb-12 text-center">
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-serif text-primary-1 mb-4 md:mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {title}
                </motion.h2>
                <motion.p
                    className="text-text-sec text-lg max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {description}
                </motion.p>
            </div>
            
            <AnimatePresence mode="wait">
                {selectedItem ? (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        setSelectedItem={setSelectedItem}
                        mediaItems={items}
                    />
                ) : (
                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[100px] sm:auto-rows-[120px] md:auto-rows-[160px] grid-flow-dense"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "0px" }}
                        exit="hidden"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                    >
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${item.span}`}
                                onClick={() => setSelectedItem(item)}
                                variants={{
                                    hidden: { y: 20, scale: 0.95, opacity: 0 },
                                    visible: {
                                        y: 0,
                                        scale: 1,
                                        opacity: 1,
                                        transition: {
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 25,
                                            delay: index * 0.05
                                        }
                                    }
                                }}
                                whileHover={{ zIndex: 10 }}
                            >
                                <MediaItem
                                    item={item}
                                    className="absolute inset-0 w-full h-full transition-transform duration-700 md:group-hover:scale-110"
                                    onClick={() => setSelectedItem(item)}
                                />
                                {item.type !== 'youtube' && (
                                    <motion.div
                                        className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:from-black/60 md:via-transparent md:to-transparent"
                                        initial={{ opacity: 1 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 className="relative text-white text-lg sm:text-xl font-serif font-medium">
                                            {item.title}
                                        </h3>
                                        <p className="relative text-white/80 text-sm mt-1 line-clamp-2 font-sans">
                                            {item.desc}
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveBentoGallery;
