import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const DiscordProfile = () => {
  const [discordData, setDiscordData] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasLanyardError, setHasLanyardError] = useState(false); // Flag untuk skip retry jika 404

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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(true)}
          className="relative group"
        >
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 bg-black/50 backdrop-blur-md shadow-lg ring-2 ring-white/10">
            {isLoading ? (
              <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <img
                src={avatarUrl}
                alt={username}
                className="w-full h-full object-cover"
                loading="eager"
                onError={(e) => {
                  // Fallback ke default avatar jika error
                  const defaultNum = (parseInt(DISCORD_ID) >> 22) % 6;
                  e.target.src = `https://cdn.discordapp.com/embed/avatars/${defaultNum}.png?size=256`;
                  e.target.onerror = null; // Prevent infinite loop
                }}
              />
            )}
          </div>
          {/* Status indicator */}
          {!isLoading && (
            <motion.div
              className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full border-2 border-slate-950 ${getStatusColor(
                status
              )} shadow-lg z-10`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <div
                className={`w-full h-full rounded-full ${getStatusColor(
                  status
                )}`}
              />
            </motion.div>
          )}
          {/* Hover tooltip */}
          <motion.div
            className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-black/90 backdrop-blur-md text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-white/10 shadow-xl"
            initial={{ opacity: 0, y: 5 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            <div className="font-semibold">{username}</div>
            <div className="text-gray-400 text-[10px] mt-0.5">
              {getStatusText(status)}
            </div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
          </motion.div>
        </motion.button>
        ) : (
          // Expanded view - full profile card
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[calc(100vw-2rem)] sm:w-80 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
          >
          {/* Header */}
          <div className="relative h-20 bg-gradient-to-br from-purple-600/30 via-blue-600/30 to-cyan-600/30">
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500" />
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Close button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>

            {/* Profile section */}
            <div className="flex items-center gap-4 mt-2">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/30 bg-black/50 shadow-lg">
                  {isLoading ? (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 animate-pulse flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white/30 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <img
                      src={avatarUrl}
                      alt={username}
                      className="w-full h-full object-cover"
                      loading="eager"
                      onError={(e) => {
                        // Fallback ke default avatar jika error
                        const defaultNum = (parseInt(DISCORD_ID) >> 22) % 6;
                        e.target.src = `https://cdn.discordapp.com/embed/avatars/${defaultNum}.png?size=256`;
                        e.target.onerror = null; // Prevent infinite loop
                      }}
                    />
                  )}
                </div>
                {/* Status indicator */}
                {!isLoading && (
                  <motion.div
                    className={`absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full border-2 border-slate-950 ${getStatusColor(
                      status
                    )} shadow-lg z-10`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <div
                      className={`w-full h-full rounded-full ${getStatusColor(
                        status
                      )}`}
                    />
                  </motion.div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-lg truncate">
                  {username}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusColor(
                      status
                    )} animate-pulse`}
                  />
                  <span className="text-gray-400 text-sm">
                    {getStatusText(status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Activities section */}
            {activities.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-white/10">
                <h4 className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                  Activity
                </h4>
                {activities.slice(0, 2).map((activity, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 rounded-lg p-2 border border-white/10"
                  >
                    <div className="text-white text-sm font-medium truncate">
                      {activity.name}
                    </div>
                    {activity.details && (
                      <div className="text-gray-400 text-xs mt-1 truncate">
                        {activity.details}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Discord button */}
            <motion.a
              href="https://discord.com/users/968070307095150602"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg font-medium transition-colors shadow-lg"
            >
              <MessageCircle size={18} />
              <span>Message on Discord</span>
            </motion.a>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DiscordProfile;

