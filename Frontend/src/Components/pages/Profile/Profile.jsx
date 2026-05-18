import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { url, token } = useContext(StoreContext);
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "" });
  const navegate = useNavigate();

  useEffect(() => {
    if (!token) { navegate("/"); return; }
    axios.post(`${url}/api/user/profile`, {}, { headers: { token } }).then((res) => {
      if (res.data.success) { setProfile(res.data.data); setName(res.data.data.name); }
    });
  }, [token, navegate, url]);

  const updateProfile = async () => {
    const res = await axios.post(`${url}/api/user/update`, { name }, { headers: { token } });
    if (res.data.success) { toast.success("Profile updated"); setProfile(res.data.data); }
    else toast.error(res.data.message);
  };

  const changePassword = async () => {
    if (!pwForm.currentPassword || !pwForm.newPassword) return toast.error("Fill both fields");
    const res = await axios.post(`${url}/api/user/change-password`, pwForm, { headers: { token } });
    if (res.data.success) { toast.success("Password changed"); setPwForm({ currentPassword: "", newPassword: "" }); }
    else toast.error(res.data.message);
  };

  return (
    <div className="profile-page">
      <h2>My Profile</h2>
      {!profile ? <p>Loading...</p> : (
        <>
          <div className="profile-section">
            <label>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} />
            <label>Email</label>
            <input value={profile.email} disabled />
            <button onClick={updateProfile}>Save</button>
          </div>
          <div className="profile-section">
            <h3>Change Password</h3>
            <input type="password" placeholder="Current password" value={pwForm.currentPassword} onChange={e => setPwForm({ ...pwForm, currentPassword: e.target.value })} />
            <input type="password" placeholder="New password" value={pwForm.newPassword} onChange={e => setPwForm({ ...pwForm, newPassword: e.target.value })} />
            <button onClick={changePassword}>Change Password</button>
          </div>
          <div className="profile-links">
            <button onClick={() => navegate("/addresses")}>Saved Addresses</button>
            <button onClick={() => navegate("/myorders")}>My Orders</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
