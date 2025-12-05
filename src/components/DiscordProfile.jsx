import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const DiscordProfile = () => {
  const [discordData, setDiscordData] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasLanyardError, setHasLanyardError] = useState(false); // Flag untuk skip retry jika 404
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardRef, setCardRef] = useState(null);
  const [avatarMousePos, setAvatarMousePos] = useState({ x: 0, y: 0 });
  const [avatarRef, setAvatarRef] = useState(null);

  const DISCORD_ID = "968070307095150602";

  useEffect(() => {
    const fetchDiscordStatus = async () => {
      // Skip fetch jika sudah pernah dapat 404 (user belum terhubung dengan Lanyard)
      if (hasLanyardError) {
        return;
      }

      try {
        setIsLoading(true);
        
        // Gunakan AbortController untuk handle error dengan lebih baik
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 detik timeout
        
        const response = await fetch(
          `https://api.lanyard.rest/v1/users/${DISCORD_ID}`,
          {
            signal: controller.signal,
          }
        ).catch(() => null); // Catch network error secara silent
        
        clearTimeout(timeoutId);
        
        // Jika response tidak OK (404, 500, dll), gunakan fallback tanpa throw error
        if (!response || !response.ok) {
          // Set flag agar tidak retry lagi
          setHasLanyardError(true);
          // User mungkin belum terhubung dengan Lanyard, gunakan fallback
          setDiscordData({
            discord_user: {
              id: DISCORD_ID,
              username: "bagasdwipermana",
              discriminator: "0",
              avatar: null,
            },
            discord_status: "offline",
            activities: [],
          });
          setError(null);
          setIsLoading(false);
          return;
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          setDiscordData(data.data);
          setError(null);
        } else {
          // Jika API tidak sukses, tetap set data dengan ID
          setDiscordData({
            discord_user: {
              id: DISCORD_ID,
              username: data.data?.discord_user?.username || "bagasdwipermana",
              discriminator: data.data?.discord_user?.discriminator || "0",
              avatar: data.data?.discord_user?.avatar || null,
            },
            discord_status: data.data?.discord_status || "offline",
            activities: data.data?.activities || [],
          });
        }
      } catch (err) {
        // Silent error - tidak perlu log jika user belum terhubung dengan Lanyard
        // AbortError, NetworkError, atau 404 adalah hal yang normal
        if (
          err.name !== "AbortError" &&
          err.name !== "TypeError" &&
          !err.message?.includes("Failed to fetch") &&
          !err.message?.includes("404")
        ) {
          // Hanya log error yang tidak expected
          if (import.meta.env.DEV) {
            console.warn("Discord status API unavailable:", err.message);
          }
        }
        setError(null); // Set null agar tidak menampilkan error
        // Fallback data jika API error - tetap gunakan ID yang benar
        setDiscordData({
          discord_user: {
            id: DISCORD_ID,
            username: "bagasdwipermana",
            discriminator: "0",
            avatar: null,
          },
          discord_status: "offline",
          activities: [],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiscordStatus();
    // Refresh setiap 30 detik hanya jika belum ada error
    const interval = setInterval(() => {
      if (!hasLanyardError) {
        fetchDiscordStatus();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [hasLanyardError]);

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "idle":
        return "bg-yellow-500";
      case "dnd":
        return "bg-red-500";
      case "offline":
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "online":
        return "Online";
      case "idle":
        return "Idle";
      case "dnd":
        return "Do Not Disturb";
      case "offline":
      default:
        return "Offline";
    }
  };

  const getAvatarUrl = () => {
    // Selalu gunakan DISCORD_ID sebagai fallback
    const userId = discordData?.discord_user?.id || DISCORD_ID;
    const avatar = discordData?.discord_user?.avatar;
    
    // Jika ada avatar hash, gunakan itu
    if (avatar && avatar !== null && avatar !== undefined && avatar !== "") {
      // Cek apakah avatar adalah animated (gif) atau static (png)
      const isAnimated = avatar.startsWith("a_");
      const extension = isAnimated ? "gif" : "png";
      return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.${extension}?size=256`;
    }
    
    // Jika tidak ada avatar, gunakan default Discord avatar berdasarkan user ID
    // Discord menggunakan algoritma: (user_id >> 22) % 6 untuk default avatar
    const userIdNum = parseInt(userId);
    const defaultAvatarNum = (userIdNum >> 22) % 6;
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNum}.png?size=256`;
  };

  const username = discordData?.discord_user?.username || "bagasdwipermana";
  const status = discordData?.discord_status || "offline";
  // Selalu dapatkan avatar URL - gunakan default jika belum ada data
  const getDefaultAvatar = () => {
    const defaultNum = (parseInt(DISCORD_ID) >> 22) % 6;
    return `https://cdn.discordapp.com/embed/avatars/${defaultNum}.png?size=256`;
  };
  
  const avatarUrl = discordData ? getAvatarUrl() : getDefaultAvatar();
  const activities = discordData?.activities || [];

  // Handle mouse move for compact avatar 3D effect
  useEffect(() => {
    if (isExpanded || !avatarRef) return;

    const handleMouseMove = (e) => {
      if (!avatarRef) return;
      const rect = avatarRef.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 8;
      const rotateY = (centerX - x) / 8;
      
      setAvatarMousePos({ x: rotateY, y: rotateX });
    };

    const handleMouseLeave = () => {
      setAvatarMousePos({ x: 0, y: 0 });
    };

    avatarRef.addEventListener("mousemove", handleMouseMove);
    avatarRef.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (avatarRef) {
        avatarRef.removeEventListener("mousemove", handleMouseMove);
        avatarRef.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isExpanded, avatarRef]);

  // Handle mouse move for expanded card 3D effect
  useEffect(() => {
    if (!isExpanded || !cardRef) return;

    const handleMouseMove = (e) => {
      if (!cardRef) return;
      const rect = cardRef.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      setMousePosition({ x: rotateY, y: rotateX });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    cardRef.addEventListener("mousemove", handleMouseMove);
    cardRef.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (cardRef) {
        cardRef.removeEventListener("mousemove", handleMouseMove);
        cardRef.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isExpanded, cardRef]);

  return (
    <motion.div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
        // Compact view - just avatar with status
        <motion.button
          key="compact"
          whileHover={{ scale: 1.15, y: -6 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(true)}
          className="relative group"
          style={{ perspective: "1000px" }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {/* Outer glow ring - pulsing */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: `radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)`,
              filter: 'blur(12px)',
            }}
          />
          
          {/* Middle glow ring */}
          <motion.div
            className="absolute -inset-2 rounded-full"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            style={{
              background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)`,
              filter: 'blur(8px)',
            }}
          />

          <motion.div 
            ref={setAvatarRef}
            className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white bg-black/80 backdrop-blur-xl z-10"
            animate={{
              rotateX: avatarMousePos.y,
              rotateY: avatarMousePos.x,
            }}
            whileHover={{ 
              scale: 1.1,
            }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25,
            }}
            style={{ 
              transformStyle: "preserve-3d",
              boxShadow: `
                0 0 0 2px rgba(255,255,255,0.2),
                0 8px 32px rgba(0,0,0,0.5),
                0 0 40px rgba(255,255,255,0.1),
                0 0 80px rgba(255,255,255,0.05),
                inset 0 0 20px rgba(255,255,255,0.1)
              `,
            }}
          >
            {isLoading ? (
              <div className="w-full h-full bg-black/80 animate-pulse flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                <img
                  src={avatarUrl}
                  alt={username}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-125 group-hover:brightness-110 relative z-10"
                  loading="eager"
                  onError={(e) => {
                    const defaultNum = (parseInt(DISCORD_ID) >> 22) % 6;
                    e.target.src = `https://cdn.discordapp.com/embed/avatars/${defaultNum}.png?size=256`;
                    e.target.onerror = null;
                  }}
                />
                {/* Dynamic light reflection based on mouse */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                  style={{
                    background: `radial-gradient(circle at ${50 + avatarMousePos.x * 2}% ${50 + avatarMousePos.y * 2}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
                  }}
                />
                {/* Shine sweep effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out rounded-full" />
                {/* Inner glow */}
                <div 
                  className="absolute inset-0 rounded-full opacity-50"
                  style={{
                    background: `radial-gradient(circle at ${50 + avatarMousePos.x}% ${50 + avatarMousePos.y}%, rgba(255,255,255,0.2) 0%, transparent 70%)`,
                    filter: 'blur(4px)',
                  }}
                />
              </>
            )}
          </motion.div>
          {/* Status indicator with enhanced 3D glow */}
          {!isLoading && (
            <motion.div
              className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-black ${getStatusColor(
                status
              )} z-20`}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                y: [0, -2, 0],
              }}
              whileHover={{ scale: 1.3 }}
              transition={{ 
                delay: 0.3, 
                type: "spring", 
                stiffness: 200,
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              style={{
                boxShadow: `
                  0 0 10px currentColor,
                  0 0 20px currentColor,
                  0 0 30px currentColor,
                  0 0 40px currentColor,
                  0 4px 12px rgba(0,0,0,0.5)
                `,
                filter: 'drop-shadow(0 0 8px currentColor)',
              }}
            >
              <div
                className={`w-full h-full rounded-full ${getStatusColor(
                  status
                )} ${
                  status === "online" ? "animate-pulse" : ""
                }`}
              />
              {/* Pulsing glow ring for online status */}
              {status === "online" && (
                <>
                  <motion.div
                    className={`absolute inset-0 rounded-full ${getStatusColor(status)}`}
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      filter: 'blur(6px)',
                    }}
                  />
                  <motion.div
                    className={`absolute inset-0 rounded-full ${getStatusColor(status)}`}
                    animate={{
                      scale: [1, 2.2, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3,
                    }}
                    style={{
                      filter: 'blur(8px)',
                    }}
                  />
                </>
              )}
            </motion.div>
          )}
          {/* Hover tooltip with 3D effect */}
          <motion.div
            className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-black/95 backdrop-blur-xl text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none border-2 border-white z-30"
            initial={{ opacity: 0, y: 10, scale: 0.8, rotateX: -15, z: -50 }}
            whileHover={{ opacity: 1, y: 0, scale: 1, rotateX: 0, z: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              transformStyle: "preserve-3d",
              boxShadow: `
                0 0 0 1px rgba(255,255,255,0.2),
                0 8px 32px rgba(0,0,0,0.6),
                0 0 40px rgba(255,255,255,0.1),
                inset 0 1px 0 rgba(255,255,255,0.2)
              `,
            }}
          >
            {/* Tooltip glow */}
            <div 
              className="absolute inset-0 rounded-lg opacity-30"
              style={{
                background: `radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)`,
                filter: 'blur(4px)',
              }}
            />
            <div className="font-bold text-xs relative z-10">{username}</div>
            <div className="flex items-center gap-1.5 text-gray-300 text-[10px] mt-0.5 relative z-10">
              <div
                className={`w-1.5 h-1.5 rounded-full ${getStatusColor(status)} ${
                  status === "online" ? "animate-pulse" : ""
                }`}
                style={{
                  boxShadow: `0 0 6px currentColor`,
                }}
              />
              {getStatusText(status)}
            </div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-black/95" />
          </motion.div>
        </motion.button>
        ) : (
          // Expanded view - full profile card
          <motion.div
            key="expanded"
            ref={setCardRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotateX: mousePosition.y,
              rotateY: mousePosition.x,
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20, rotateX: 0, rotateY: 0 }}
            transition={{ 
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
              y: { duration: 0.3 },
              rotateX: { type: "spring", stiffness: 300, damping: 30 },
              rotateY: { type: "spring", stiffness: 300, damping: 30 },
            }}
            style={{
              transformStyle: "preserve-3d",
              boxShadow: `
                0 0 0 2px rgba(255,255,255,0.1),
                0 8px 32px rgba(0,0,0,0.4),
                0 0 60px rgba(255,255,255,0.05),
                0 0 120px rgba(255,255,255,0.02),
                inset 0 1px 0 rgba(255,255,255,0.15),
                inset 0 -1px 0 rgba(255,255,255,0.05)
              `,
            }}
            className="relative w-[calc(100vw-2rem)] sm:w-72 bg-black/95 backdrop-blur-2xl border-2 border-white rounded-2xl overflow-hidden"
          >
          {/* 3D Glow Effect - Multiple layers */}
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at ${50 + mousePosition.x * 0.5}% ${50 + mousePosition.y * 0.5}%, rgba(255,255,255,0.08) 0%, transparent 70%),
                linear-gradient(${135 + mousePosition.x * 0.3}deg, rgba(255,255,255,0.03) 0%, transparent 50%)
              `,
              filter: 'blur(1px)',
            }}
          />
          
          {/* Top highlight for 3D depth */}
          <div 
            className="absolute top-0 left-0 right-0 h-1/3 rounded-t-2xl pointer-events-none opacity-30"
            style={{
              background: `linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)`,
              transform: `translateZ(1px)`,
            }}
          />
          
          {/* Side glow that follows rotation */}
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `
                linear-gradient(${90 + mousePosition.x * 2}deg, 
                  transparent 0%, 
                  rgba(255,255,255,0.1) ${50 + mousePosition.x}%, 
                  transparent 100%)
              `,
              opacity: Math.abs(mousePosition.x) * 0.1 + 0.05,
            }}
          />

          {/* Header */}
          <div className="relative h-16 bg-black/50 border-b-2 border-white/50 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
            </div>
            {/* Header glow */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                boxShadow: `0 0 8px rgba(255,255,255,0.2)`,
              }}
            />
          </div>

          {/* Content */}
          <div className="p-4 space-y-4 bg-black">
            {/* Close button */}
            <motion.button
              onClick={() => setIsExpanded(false)}
              whileHover={{ scale: 1.15, rotate: 90, backgroundColor: "white", color: "black" }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black hover:bg-white hover:text-black backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 shadow-lg border-2 border-white z-20"
            >
              <X size={14} />
            </motion.button>

            {/* Profile section */}
            <div className="flex items-center gap-3 mt-2 relative z-10">
              <div className="relative group">
                {/* Avatar glow ring */}
                <div 
                  className="absolute -inset-1 rounded-full opacity-50 blur-sm"
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)`,
                    transform: `translateZ(-5px)`,
                  }}
                />
                <motion.div 
                  className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white bg-black/50"
                  whileHover={{ scale: 1.1, rotateY: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{
                    boxShadow: `
                      0 0 20px rgba(255,255,255,0.2),
                      0 8px 32px rgba(0,0,0,0.6),
                      inset 0 0 20px rgba(255,255,255,0.05)
                    `,
                  }}
                >
                  {isLoading ? (
                    <div className="w-full h-full bg-black/80 animate-pulse flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <>
                      <img
                        src={avatarUrl}
                        alt={username}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 relative z-10"
                        loading="eager"
                        onError={(e) => {
                          const defaultNum = (parseInt(DISCORD_ID) >> 22) % 6;
                          e.target.src = `https://cdn.discordapp.com/embed/avatars/${defaultNum}.png?size=256`;
                          e.target.onerror = null;
                        }}
                      />
                      {/* Avatar shine overlay */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)`,
                        }}
                      />
                    </>
                  )}
                </motion.div>
                {/* Status indicator with enhanced glow */}
                {!isLoading && (
                  <motion.div
                    className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full border-2 border-black ${getStatusColor(
                      status
                    )} z-20`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.3 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    style={{
                      boxShadow: `
                        0 0 10px currentColor,
                        0 0 20px currentColor,
                        0 0 30px currentColor,
                        0 0 40px currentColor
                      `,
                      filter: 'drop-shadow(0 0 8px currentColor)',
                    }}
                  >
                    <div
                      className={`w-full h-full rounded-full ${getStatusColor(
                        status
                      )} ${
                        status === "online"
                          ? "animate-pulse"
                          : ""
                      }`}
                    />
                    {/* Pulsing glow ring */}
                    {status === "online" && (
                      <motion.div
                        className={`absolute inset-0 rounded-full ${getStatusColor(status)}`}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{
                          filter: 'blur(4px)',
                        }}
                      />
                    )}
                  </motion.div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-base truncate drop-shadow-lg">
                  {username}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusColor(
                      status
                    )} ${
                      status === "online"
                        ? "animate-pulse shadow-sm shadow-green-500/50"
                        : ""
                    }`}
                  />
                  <span className="text-gray-300 text-xs font-medium">
                    {getStatusText(status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Activities section */}
            {activities.length > 0 && (
              <div className="space-y-2 pt-3 border-t-2 border-white/50 relative z-10">
                {/* Divider glow */}
                <div 
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                    boxShadow: `0 0 8px rgba(255,255,255,0.2)`,
                  }}
                />
                <h4 className="text-white text-[10px] font-bold uppercase tracking-widest mb-2 relative">
                  Activity
                </h4>
                {activities.slice(0, 2).map((activity, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10, rotateX: -10 }}
                    animate={{ opacity: 1, x: 0, rotateX: 0 }}
                    transition={{ delay: idx * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -2,
                      backgroundColor: "white",
                      color: "black",
                      rotateX: -2,
                      rotateY: 2,
                    }}
                    className="bg-black/80 rounded-lg p-2.5 border-2 border-white/80 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                    style={{ 
                      transformStyle: "preserve-3d",
                      boxShadow: `
                        0 4px 16px rgba(0,0,0,0.3),
                        0 0 0 1px rgba(255,255,255,0.1),
                        inset 0 1px 0 rgba(255,255,255,0.1)
                      `,
                    }}
                  >
                    {/* Card glow on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)`,
                      }}
                    />
                    <div className="text-white group-hover:text-black text-xs font-semibold truncate flex items-center gap-1.5 transition-colors duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-black transition-colors duration-300" />
                      {activity.name}
                    </div>
                    {activity.details && (
                      <div className="text-gray-300 group-hover:text-black text-[10px] mt-1 truncate pl-3.5 transition-colors duration-300">
                        {activity.details}
                      </div>
                    )}
                    {activity.state && (
                      <div className="text-gray-400 group-hover:text-black text-[10px] mt-0.5 truncate pl-3.5 transition-colors duration-300">
                        {activity.state}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Discord button */}
            <motion.a
              href="https://discord.com/users/968070307095150602"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.03, 
                y: -3,
                backgroundColor: "white",
                color: "black",
                rotateX: -3,
                rotateY: 2,
              }}
              whileTap={{ scale: 0.97 }}
              className="relative w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg font-semibold transition-all duration-300 border-2 border-white group overflow-hidden"
              style={{
                transformStyle: "preserve-3d",
                boxShadow: `
                  0 4px 16px rgba(0,0,0,0.4),
                  0 0 0 1px rgba(255,255,255,0.1),
                  inset 0 1px 0 rgba(255,255,255,0.15)
                `,
              }}
            >
              {/* Button glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)`,
                  filter: 'blur(8px)',
                }}
              />
              {/* Shine effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                }}
              />
              <MessageCircle size={16} className="drop-shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10" />
              <span className="text-xs relative z-10">Message on Discord</span>
            </motion.a>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DiscordProfile;

