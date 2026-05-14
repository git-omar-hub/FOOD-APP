import "./Skeleton.css";

const Skeleton = ({ type = "card", count = 1 }) => {
  const items = Array.from({ length: count });
  return (
    <div className={`skeleton-wrapper skeleton-${type}`}>
      {items.map((_, i) => (
        <div key={i} className="skeleton-item">
          {type === "card" && (
            <>
              <div className="skeleton-img" />
              <div className="skeleton-line skeleton-line--title" />
              <div className="skeleton-line skeleton-line--desc" />
              <div className="skeleton-line skeleton-line--price" />
            </>
          )}
          {type === "order" && (
            <>
              <div className="skeleton-order-line" />
              <div className="skeleton-order-line" />
              <div className="skeleton-order-line skeleton-order-line--short" />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
