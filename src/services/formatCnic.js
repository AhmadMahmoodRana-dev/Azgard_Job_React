
  const formatCnic = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 5) return cleaned;
    if (cleaned.length <= 12)
      return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 12)}`;
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 12)}-${cleaned.slice(
      12,
      13
    )}`;
  };

  export default formatCnic;