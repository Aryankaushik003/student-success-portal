export const formatDeadline = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getUrgencyInfo = (deadlineIso) => {
  if (!deadlineIso) return { label: "No Deadline", color: "gray", isUrgent: false };
  
  const now = new Date();
  const deadline = new Date(deadlineIso);
  const diffMs = deadline.getTime() - now.getTime();
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffMs < 0) {
    const overdueDays = Math.abs(diffDays) || 1;
    return {
      label: `Overdue (${overdueDays}d ago)`,
      tag: "Overdue",
      color: "red",
      status: "critical",
      isUrgent: true,
      timeRemaining: "Overdue"
    };
  }

  if (diffHours <= 12) {
    return {
      label: `Due in ${Math.max(1, diffHours)}h`,
      tag: "Due Today",
      color: "rose",
      status: "urgent",
      isUrgent: true,
      timeRemaining: `${diffHours} hrs left`
    };
  }

  if (diffHours <= 24) {
    return {
      label: "Due Today",
      tag: "Due Today",
      color: "amber",
      status: "warning",
      isUrgent: true,
      timeRemaining: `${diffHours} hrs left`
    };
  }

  if (diffHours <= 48) {
    return {
      label: "Due Tomorrow",
      tag: "Due Tomorrow",
      color: "orange",
      status: "warning",
      isUrgent: false,
      timeRemaining: "Tomorrow"
    };
  }

  if (diffDays <= 7) {
    return {
      label: `Due in ${diffDays} days`,
      tag: `${diffDays} days left`,
      color: "blue",
      status: "normal",
      isUrgent: false,
      timeRemaining: `${diffDays} days`
    };
  }

  return {
    label: `Due in ${diffDays} days`,
    tag: "Safe",
    color: "emerald",
    status: "safe",
    isUrgent: false,
    timeRemaining: `${diffDays} days`
  };
};

export const getCountdown = (deadlineIso) => {
  if (!deadlineIso) return "";
  const now = new Date();
  const target = new Date(deadlineIso);
  const diffMs = target - now;

  if (diffMs <= 0) return "Deadline passed";

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

  if (days > 0) return `${days}d ${hours}h left`;
  return `${hours}h ${minutes}m left`;
};

