export const calculatePercentage = (attended, total) => {
  if (!total || total === 0) return 0;
  return Math.round((attended / total) * 1000) / 10; // 1 decimal place e.g. 78.5
};

export const getAttendanceStatus = (percentage, threshold = 75) => {
  if (percentage >= threshold + 10) {
    return {
      status: "Excellent",
      color: "emerald",
      textColor: "text-emerald-700 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      strokeColor: "#10b981",
      badgeText: "Safe",
      isCritical: false,
    };
  } else if (percentage >= threshold) {
    return {
      status: "Good",
      color: "emerald",
      textColor: "text-teal-700 dark:text-teal-400",
      bgColor: "bg-teal-50 dark:bg-teal-950/40",
      borderColor: "border-teal-200 dark:border-teal-800",
      strokeColor: "#14b8a6",
      badgeText: "Satisfactory",
      isCritical: false,
    };
  } else if (percentage >= threshold - 5) {
    return {
      status: "Warning",
      color: "amber",
      textColor: "text-amber-700 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/40",
      borderColor: "border-amber-200 dark:border-amber-800",
      strokeColor: "#f59e0b",
      badgeText: "Near Shortage",
      isCritical: true,
    };
  } else {
    return {
      status: "Shortage",
      color: "rose",
      textColor: "text-rose-700 dark:text-rose-400",
      bgColor: "bg-rose-50 dark:bg-rose-950/40",
      borderColor: "border-rose-200 dark:border-rose-800",
      strokeColor: "#f43f5e",
      badgeText: "Critical Shortage",
      isCritical: true,
    };
  }
};

/**
 * Calculates how many consecutive classes are needed to reach target %,
 * or how many can be safely skipped while staying >= target %.
 */
export const calculateClassRequirements = (attended, total, target = 75) => {
  const currentPct = total > 0 ? (attended / total) * 100 : 0;
  const targetRatio = target / 100;

  if (currentPct < target) {
    // Need: (attended + x) / (total + x) >= targetRatio
    // attended + x >= targetRatio * total + targetRatio * x
    // x * (1 - targetRatio) >= targetRatio * total - attended
    // x = ceil((targetRatio * total - attended) / (1 - targetRatio))
    const needed = Math.ceil((targetRatio * total - attended) / (1 - targetRatio));
    return {
      type: "need_more",
      count: Math.max(1, needed),
      message: `Attend next ${Math.max(1, needed)} consecutive class${needed > 1 ? "es" : ""} to reach ${target}%`,
    };
  } else {
    // Can skip: attended / (total + y) >= targetRatio
    // attended >= targetRatio * (total + y)
    // total + y <= attended / targetRatio
    // y = floor((attended / targetRatio) - total)
    const canSkip = Math.floor(attended / targetRatio - total);
    return {
      type: "can_skip",
      count: Math.max(0, canSkip),
      message:
        canSkip > 0
          ? `You can safely miss ${canSkip} upcoming class${canSkip > 1 ? "es" : ""} and maintain ${target}%`
          : `On track! Don't miss the next class to stay above ${target}%`,
    };
  }
};

