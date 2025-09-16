import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaYoutube, FaExternalLinkAlt } from 'react-icons/fa';

const SocialMediaShowcase = () => {
  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Featured (old) videos to always showcase
  const featuredVideos = useMemo(() => ([
    {
      id: 'PecGPR1V81w',
      title: 'VLOG - 1 | The introduction | International Student | India To Canada',
      thumbnailUrl: 'https://img.youtube.com/vi/PecGPR1V81w/maxresdefault.jpg',
      link: 'https://www.youtube.com/watch?v=PecGPR1V81w&t=12s'
    },
    {
      id: 'wxz74NvztgQ',
      title: 'VLOG - 2 | Montreal Winter Travel Vlog | International Student',
      thumbnailUrl: 'https://img.youtube.com/vi/wxz74NvztgQ/maxresdefault.jpg',
      link: 'https://www.youtube.com/watch?v=wxz74NvztgQ'
    },
    {
      id: 'mgtNP3AAz',
      title: 'VLOG 3 | Hidden Gems of Quebec 🌍 | Peaceful Escapes & Personal Chaos',
      thumbnailUrl: 'https://i9.ytimg.com/vi/mgtNP3AAzaM/maxresdefault.jpg?v=6876b156&sqp=CKSu58UG&rs=AOn4CLCki9b6Zu3XmphiZfOBnGScobGz5Q',
      link: 'https://youtu.be/mgtNP3AAzaM?si=DEQwK7yD_geJMQ0X'
    },
  ]), []);

  // State: videos fetched from backend and hover state for preview
  const [videos, setVideos] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch('/api/youtube/latest?maxResults=6');
        const data = await res.json();
        if (!alive) return;
        if (data && data.success) {
          setVideos(data.items || []);
        } else {
          setError(data?.message || 'Failed to load videos');
        }
      } catch (e) {
        setError('Unable to connect to YouTube API');
      }
    })();
    return () => { alive = false; };
  }, []);

  // Combine featured and fetched videos, keeping featured first and unique ids
  const displayedVideos = useMemo(() => {
    const byId = new Set(featuredVideos.map(v => v.id));
    const rest = (videos || []).filter(v => v && v.id && !byId.has(v.id));
    return [...featuredVideos, ...rest];
  }, [featuredVideos, videos]);

  return (
    <section id="social-media" className="social-media-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -10, letterSpacing: '-0.02em', scaleX: 0.96 }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: '0.01em', scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          My YouTube Channel
        </motion.h2>

        <motion.div
          className="youtube-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {displayedVideos.map((video) => (
            <motion.div
              key={video.id}
              className="youtube-video"
              variants={itemVariants}
              whileHover={{ scale: 1.04 }}
              onMouseEnter={() => setHovered(video.id)}
              onMouseLeave={() => setHovered((h) => (h === video.id ? null : h))}
            >
              <a
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-thumbnail"
                style={{ position: 'relative' }}
              >
                {/* Thumbnail only; enlarged preview handled by overlay */}
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  onError={(e) => {
                    const id = video.id;
                    e.target.onerror = null;
                    if (!id) return;
                    const src = e.target.src;
                    if (src.includes('maxresdefault')) e.target.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
                    else if (src.includes('hqdefault')) e.target.src = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
                    else if (src.includes('mqdefault')) e.target.src = `https://img.youtube.com/vi/${id}/sddefault.jpg`;
                    else e.target.src = `https://img.youtube.com/vi/${id}/default.jpg`;
                  }}
                  loading="lazy"
                />
                <div className="youtube-play-button">
                  <FaYoutube />
                </div>
              </a>
              <h3 className="youtube-title">{video.title}</h3>
            </motion.div>
          ))}
          {/* Intentionally no fallback message when empty */}
          <motion.a
            href="https://www.youtube.com/@anshumaanrajpurohit"
            target="_blank"
            rel="noopener noreferrer"
            className="view-all-link"
            variants={itemVariants}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            View all videos <FaExternalLinkAlt />
          </motion.a>
          {/* Hover overlay preview: enlarged player centered on screen */}
          {hovered && (() => {
            const v = displayedVideos.find(x => x.id === hovered);
            if (!v) return null;
            return (
              <motion.div
                className="youtube-hover-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ pointerEvents: 'none' }}
              >
                <motion.div
                  className="youtube-hover-frame"
                  initial={{ scale: 0.9, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0`}
                    title={v.title}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    style={{ width: '100%', height: '100%', border: 0, borderRadius: 12 }}
                  />
                </motion.div>
              </motion.div>
            );
          })()}
          </motion.div>
      </div>
    </section>
  );
};

export default SocialMediaShowcase;
