import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "sonner";
import { StoreContext } from "../context/StoreContext";
import Modal from "../Modal/Modal";
import "./ReviewModal.css";

const StarInput = ({ value, onChange }) => (
  <div className="star-input">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        className={`star-btn ${star <= value ? "star-btn--active" : ""}`}
        onClick={() => onChange(star)}
      >
        ★
      </button>
    ))}
  </div>
);

const ReviewModal = ({ foodId, foodName, onClose }) => {
  const { url, token } = useContext(StoreContext);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.post(`${url}/api/review/get`, { foodId }).then((res) => {
      if (res.data.success) {
        setReviews(res.data.data || []);
        setAverage(res.data.average || 0);
        setCount(res.data.count || 0);
      }
    });
  }, [foodId, url]);

  const handleSubmit = async () => {
    if (!token) return toast.error("Sign in to leave a review");
    setSubmitting(true);
    try {
      const res = await axios.post(
        `${url}/api/review/add`,
        { foodId, rating, comment },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        onClose();
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Failed to submit review");
    }
    setSubmitting(false);
  };

  return (
    <Modal open={true} onClose={onClose} title="Reviews">
      <div className="review-modal">
        <h3>{foodName}</h3>

        <div className="review-modal-summary">
          <span className="review-average">{average}</span>
          <span className="review-stars">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className={s <= Math.round(average) ? "star-filled" : "star-empty"}>★</span>
            ))}
          </span>
          <span className="review-count">({count} {count === 1 ? "review" : "reviews"})</span>
        </div>

        {reviews.length > 0 && (
          <div className="review-list">
            {reviews.slice(0, 5).map((r, i) => (
              <div key={i} className="review-item">
                <div className="review-item-stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className={s <= r.rating ? "star-filled" : "star-empty"}>★</span>
                  ))}
                </div>
                {r.comment && <p className="review-item-comment">{r.comment}</p>}
              </div>
            ))}
          </div>
        )}

        {token && (
          <div className="review-form">
            <h4>Rate this dish</h4>
            <StarInput value={rating} onChange={setRating} />
            <textarea
              placeholder="Optional: share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
            <button onClick={handleSubmit} disabled={submitting} className="review-submit-btn">
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ReviewModal;
