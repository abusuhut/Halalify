const STYLES = {
  haram: {
    text: "Haram",
    colorClass: "text-stamp-red",
  },
  not_certified: {
    text: "Not Certified",
    colorClass: "text-stamp-amber",
  },
  halal_certified: {
    text: "Halal Certified",
    colorClass: "text-stamp-green",
  },
};

export default function StatusStamp({ status, size = "md" }) {
  const style = STYLES[status] || STYLES.not_certified;
  const sizeClass = size === "lg" ? "text-2xl px-6 py-3" : "text-sm px-4 py-2";

  return (
    <span className={`ink-stamp ${style.colorClass} ${sizeClass}`}>
      {style.text}
    </span>
  );
}
