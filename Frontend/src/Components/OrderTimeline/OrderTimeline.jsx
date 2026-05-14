import "./OrderTimeline.css";

const steps = ["Food Processing", "Out for delivery", "Delivered"];

const OrderTimeline = ({ status }) => {
  const current = steps.indexOf(status);

  return (
    <div className="timeline">
      {steps.map((step, i) => {
        const done = i <= current;
        const active = i === current;
        return (
          <div key={step} className={`timeline-step ${done ? "timeline-step--done" : ""} ${active ? "timeline-step--active" : ""}`}>
            <div className="timeline-dot">{done ? "✓" : i + 1}</div>
            <span className="timeline-label">{step}</span>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
