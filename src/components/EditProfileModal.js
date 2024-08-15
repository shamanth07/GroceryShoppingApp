import React, { useState, useEffect } from 'react';
import { db, realtimedb } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, get, update } from 'firebase/database';
import '../css/EditProfileModal.css';

const EditProfileModal = ({ user, closeModal, user_id }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setMobile(user.mobile || '');
      setAddress(user.address || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userRef = ref(realtimedb, `Users/${user_id}`);
      await update(userRef, {
        firstName,
        lastName,
        email,
        mobile,
        address,
      });
      alert('Profile updated successfully');
      closeModal();
    }  catch (error) {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit_profile_modal">
      <div className="edit_profile_modal-content">
        <span className="edit_profile_close" onClick={closeModal}>&times;</span>
        <h1 className="edit_profile_title">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="edit_profile_input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="edit_profile_input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="edit_profile_input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="edit_profile_input-group">
            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <div className="edit_profile_input-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <button className="edit_profile_button" type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
