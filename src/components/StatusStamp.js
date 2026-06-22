const STYLES = {
  haram: {
    icon: "❌",
    label: "Haram",
    labelKr: "할랄 아님",
    labelUz: "Harom",
    className: "haram",
  },
  not_certified: {
    icon: "⚠️",
    label: "Not Certified",
    labelKr: "미인증",
    labelUz: "Sertifikatsiz",
    className: "not_certified",
  },
  halal_certified: {
    icon: "✅",
    label: "Halal Certified",
    labelKr: "할랄 인증",
    labelUz: "Halol sertifikatlangan",
    className: "halal_certified",
  },
};

export default function StatusStamp({ status, size = "md" }) {
  const style = STYLES[status] || STYLES.not_certified;
  const isLarge = size === "lg";

  return (
    <div className={`inline-flex flex-col items-start gap-1 ${isLarge ? "mb-2" : ""}`}>
      <span className={`status-badge ${style.className} ${isLarge ? "text-lg px-5 py-2.5" : "text-sm"}`}>
        {style.icon} {style.label}
      </span>
      {isLarge && (
        <span className="text-xs text-ink-light ml-1">
          {style.labelKr} · {style.labelUz}
        </span>
      )}
    </div>
  );
}