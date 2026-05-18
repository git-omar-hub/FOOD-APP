import "./OrderTimeline.css";

const steps = ["Food Processing", "Out for delivery", "Delivered"];

const OrderTimeline = ({ status }) => {
  const current = steps.indexOf(status);

  return (
    <div className="timeline">
      <div className="timeline-track">
        {steps.flatMap((step, i) => {
          const done = i <= current;
          const active = i === current;
          const items = [];
          if (i > 0) {
            items.push(
              <span
                key={`conn-${i}`}
                className={`timeline-connector ${done ? "timeline-connector--done" : ""}`}
              />,
            );
          }
          items.push(
            <span
              key={`dot-${i}`}
              className={`timeline-dot ${done ? "timeline-dot--done" : ""} ${active ? "timeline-dot--active" : ""}`}
            >
              {done ? "✓" : i + 1}
            </span>,
          );
          return items;
        })}
      </div>
      <div className="timeline-labels">
        {steps.map((step, i) => {
          const done = i <= current;
          const active = i === current;
          return (
            <span
              key={step}
              className={`timeline-label ${done ? "timeline-label--done" : ""} ${active ? "timeline-label--active" : ""}`}
            >
              {step}
            </span>
          );
        })}
      </div>
      {current === steps.length - 1 && (
        <div className="timeline-timer--complete">
          Delivered ✓
        </div>
      )}
    </div>
  );
};

export default OrderTimeline;
