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
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(true)}
          className="relative group"
        >
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-[3px] border-white/30 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl shadow-2xl ring-4 ring-white/5">
            {isLoading ? (
              <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/40 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <img
                src={avatarUrl}
                alt={username}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="eager"
                onError={(e) => {
                  const defaultNum = (parseInt(DISCORD_ID) >> 22) % 6;
                  e.target.src = `https://cdn.discordapp.com/embed/avatars/${defaultNum}.png?size=256`;
                  e.target.onerror = null;
                }}
              />
            )}
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          {/* Status indicator */}
          {!isLoading && (
            <motion.div
              className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-[3px] border-slate-950 ${getStatusColor(
                status
              )} shadow-2xl z-10 ring-2 ring-white/20`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <div
                className={`w-full h-full rounded-full ${getStatusColor(
                  status
                )} ${
                  status === "online" ? "animate-pulse" : ""
                }`}
              />
            </motion.div>
          )}
          {/* Hover tooltip */}
          <motion.div
            className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-slate-900/95 backdrop-blur-xl text-white text-xs rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 border border-white/20 shadow-2xl"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            whileHover={{ opacity: 1, y: 0, scale: 1 }}
          >
            <div className="font-bold text-sm">{username}</div>
            <div className="flex items-center gap-1.5 text-gray-300 text-[11px] mt-1">
              <div
                className={`w-1.5 h-1.5 rounded-full ${getStatusColor(status)} ${
                  status === "online" ? "animate-pulse" : ""
                }`}
              />
              {getStatusText(status)}
            </div>
            <div className="absolute top-full right-6 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-slate-900/95" />
          </motion.div>
        </motion.button>
        ) : (
          // Expanded view - full profile card
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[calc(100vw-2rem)] sm:w-96 bg-slate-900/95 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-white/10"
          >
          {/* Header with gradient */}
          <div className="relative h-24 bg-gradient-to-br from-purple-600/40 via-blue-600/40 to-cyan-600/40 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20" />
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 shadow-lg" />
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-5 bg-gradient-to-b from-transparent to-slate-900/50">
            {/* Close button */}
            <motion.button
              onClick={() => setIsExpanded(false)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 shadow-lg border border-white/10"
            >
              <X size={16} />
            </motion.button>

            {/* Profile section */}
            <div className="flex items-center gap-5 mt-3">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-white/40 bg-gradient-to-br from-purple-500/30 to-blue-500/30 shadow-2xl ring-4 ring-white/10">
                  {isLoading ? (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 animate-pulse flex items-center justify-center">
                      <div className="w-10 h-10 border-[3px] border-white/40 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <img
                      src={avatarUrl}
                      alt={username}
                      className="w-full h-full object-cover"
                      loading="eager"
                      onError={(e) => {
                        const defaultNum = (parseInt(DISCORD_ID) >> 22) % 6;
                        e.target.src = `https://cdn.discordapp.com/embed/avatars/${defaultNum}.png?size=256`;
                        e.target.onerror = null;
                      }}
                    />
                  )}
                </div>
                {/* Status indicator with glow */}
                {!isLoading && (
                  <motion.div
                    className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-[3px] border-slate-950 ${getStatusColor(
                      status
                    )} shadow-2xl z-10 ring-2 ring-white/30`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <div
                      className={`w-full h-full rounded-full ${getStatusColor(
                        status
                      )} ${
                        status === "online"
                          ? "animate-pulse shadow-lg shadow-green-500/50"
                          : ""
                      }`}
                    />
                  </motion.div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-xl truncate drop-shadow-lg">
                  {username}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${getStatusColor(
                      status
                    )} ${
                      status === "online"
                        ? "animate-pulse shadow-md shadow-green-500/50"
                        : ""
                    }`}
                  />
                  <span className="text-gray-300 text-sm font-medium">
                    {getStatusText(status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Activities section */}
            {activities.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-white/10">
                <h4 className="text-white/80 text-xs font-bold uppercase tracking-widest">
                  Activity
                </h4>
                {activities.slice(0, 2).map((activity, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/5 hover:bg-white/10 rounded-xl p-3 border border-white/10 backdrop-blur-sm transition-all duration-200 shadow-lg"
                  >
                    <div className="text-white text-sm font-semibold truncate flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {activity.name}
                    </div>
                    {activity.details && (
                      <div className="text-gray-400 text-xs mt-1.5 truncate pl-3.5">
                        {activity.details}
                      </div>
                    )}
                    {activity.state && (
                      <div className="text-gray-500 text-xs mt-1 truncate pl-3.5">
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
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#3c45a5] text-white rounded-xl font-semibold transition-all duration-200 shadow-xl hover:shadow-2xl hover:shadow-[#5865F2]/50 border border-white/10"
            >
              <MessageCircle size={20} className="drop-shadow-sm" />
              <span className="text-sm">Message on Discord</span>
            </motion.a>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DiscordProfile;

