/** Returns workshops sorted by datetime, excluding past ones, closest first */
export function getUpcoming(workshops = [], durationMinutes = 60) {
  const currentTime = new Date();

  return [...workshops]
    .filter((ws) => {
      if (!ws.datetime) return true;
      const end = new Date(
        new Date(ws.datetime).getTime() + durationMinutes * 60000,
      );
      return end > currentTime; // keep live + future
    })
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
}

export const categoryColors = {
  study_skills: {
    bg: "bg-[#FFC271]/10 hover:bg-[#FFC271]/20",
    text: "text-[#B87400]",
  },
  aus_essentials: {
    bg: "bg-[#9ADFB0]/10 hover:bg-[#9ADFB0]/20",
    text: "text-[#2E7D4F]",
  },
  self_care: {
    bg: "bg-[#B79CC8]/10 hover:bg-[#B79CC8]/20",
    text: "text-[#6A4C93]",
  },
  time_management: {
    bg: "bg-[#63CDF5]/10 hover:bg-[#63CDF5]/20",
    text: "text-[#1F6F8B]",
  },
  other: {
    bg: "bg-[#F5A9B8]/10 hover:bg-[#F5A9B8]/20",
    text: "text-[#A23B5A]",
  },
};
