import "./PasswordStrength.css";

const RULES = [
  { label: "At least 8 characters", test: (v) => v.length >= 8 },
  { label: "At least one uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "At least one lowercase letter", test: (v) => /[a-z]/.test(v) },
  { label: "At least one number", test: (v) => /\d/.test(v) },
  { label: "At least one special character", test: (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v) },
];

const PasswordStrength = ({ value }) => {
  if (!value) return null;

  const strength = RULES.filter((r) => r.test(value)).length;
  const barWidth = `${(strength / RULES.length) * 100}%`;
  const barColor =
    strength <= 2 ? "#e74c3c" : strength <= 3 ? "#f39c12" : strength <= 4 ? "#3498db" : "#2ecc71";

  return (
    <div className="password-strength">
      <div className="password-strength__bar">
        <div
          className="password-strength__fill"
          style={{ width: barWidth, backgroundColor: barColor }}
        />
      </div>
      <ul className="password-strength__rules">
        {RULES.map((rule) => {
          const passed = rule.test(value);
          return (
            <li key={rule.label} className={passed ? "passed" : ""}>
              {passed ? "✓" : "○"} {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordStrength;
