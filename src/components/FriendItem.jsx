function FriendItem({ username, points }) {
  return (
    <div className="friend-item">
      <div className="friend-item-avatar" />
      <div className="friend-item-info">
        <p className="friend-item-username">{username}</p>
        <p className="friend-item-points">{points} pts hoy</p>
      </div>
      <button className="friend-item-button">RETAR</button>
    </div>
  )
}

export default FriendItem
