import Topbar from "../../components/topbar/Topbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CardUser from "../../components/cardUser/CardUser";
import "./otherUser.css";
import { followUser, getAllUserOther } from "../../apiCall";
import Wrapper from "../../components/wrapper/Wrapper";
function OtherUser() {
  const [userOthers, setUserOthers] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);

  useEffect(() => {
    getAllUserOther(setUserOthers, currentUser._id);
  }, [currentUser]);

  const handleClick = async (userOther) => {
    followUser(
      currentUser.followings.includes(userOther?._id),
      userOther._id,
      currentUser._id,
      dispatch
    );
  };

  return (
    <>
      <Wrapper sologan={"add more friend"}>
        <div className="otherUser">
          <div className="wrapperOtherUser">
            <ul className="listOtherUser">
              {userOthers.map((userOther) => (
                <li className="itemOtherUser" key={userOther._id}>
                  <CardUser
                    userOther={userOther}
                    currentUser={currentUser}
                    handleClick={handleClick}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export default OtherUser;
