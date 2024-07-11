import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CardUser from "../../components/cardUser/CardUser";
import Topbar from "../../components/topbar/Topbar";
import "./followUser.css";
import { followUser, getfriendList } from "../../apiCall";
import Wrapper from "../../components/wrapper/Wrapper";

function FollowUser() {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  useEffect(() => {
    getfriendList(currentUser._id, setFriends);
  }, [currentUser]);

  const handleClick = (friend) => {
    followUser(
      currentUser.followings.includes(friend?._id),
      friend._id,
      currentUser._id,
      dispatch
    );
  };

  return (
    <Wrapper sologan={"my friend"}>
      <div className="followUser">
        <div className="wrapperFollowUser">
          <ul className="listFollowUser">
            {friends.map((friend) => (
              <li className="itemFollowUser" key={friend._id}>
                <CardUser
                  userOther={friend}
                  currentUser={currentUser}
                  handleClick={handleClick}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Wrapper>
  );
}

export default FollowUser;
