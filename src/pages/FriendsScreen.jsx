import SearchBar from '../components/SearchBar'
import FriendItem from '../components/FriendItem'

function FriendsScreen() {
  const friends = [
    { username: '@pro_gamer99', points: 4250 },
    { username: '@chill_vibes', points: 120 },
    { username: '@speed_runner', points: 890 },
  ]

  return (
    <>
      <h2 className="screen-title">AMIGOS</h2>
      <SearchBar />
      <div className="friends-list">
        {friends.map((friend) => (
          <FriendItem
            key={friend.username}
            username={friend.username}
            points={friend.points}
          />
        ))}
      </div>
    </>
  )
}

export default FriendsScreen
