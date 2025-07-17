import React, { useState } from 'react';

const Sidebar = ({ users, currentUser, selectedChat, onUserClick = () => {} }) => {
  const [search, setSearch] = useState("");

  // Get the other user's ID in the currently selected chat
  const getOtherUserId = (chat) =>
    chat?.users?.find((u) => u._id !== currentUser._id)?._id;

  const selectedUserId = getOtherUserId(selectedChat);

  return (
    <div className="p-3 h-100 d-flex flex-column">
      {/* Search bar */}
      <input
        className="form-control mb-3"
        placeholder="Search users..."
        style={{ borderRadius: '20px' }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h6 className="text-muted">All Users</h6>

      <div className="list-group overflow-auto" style={{ flex: 1 }}>
        {users
          .filter(
            (user) =>
              user._id !== currentUser._id &&
              (user.displayName || user.username || "")
                .toLowerCase()
                .includes(search.toLowerCase())
          )
          .map((user) => (
            <button
              key={user._id}
              className={`list-group-item list-group-item-action d-flex align-items-center gap-2 ${
                selectedUserId === user._id ? "active" : ""
              }`}
              onClick={() => onUserClick(user)}
              style={{ borderRadius: '10px' }}
            >
              <img
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.displayName || user.username || "User"
                  )}&background=random`
                }
                alt="avatar"
                className="rounded-circle"
                width="32"
                height="32"
              />
              <span className="text-truncate" style={{ maxWidth: '140px' }}>
                {user.displayName || user.username}
              </span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
