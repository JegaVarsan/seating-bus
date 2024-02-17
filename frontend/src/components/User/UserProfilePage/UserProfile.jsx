
import { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";
import eskoLogo from './esko-logo.png'; // Import the image file


const UserProfile = () => {
  const [associate_id, set_associate_id] = useState(localStorage.getItem('id'));
  const [user_info, set_user_info] = useState({})
  const [loading, setloading] = useState(true);

  useEffect(() => {

    try {
      const fetchdata = async () => {
        console.log(associate_id);
        console.log('Associate ID:', associate_id);
        const response = await axios.get(`http://localhost:3000/api/auth/get-user/${associate_id}`);
        console.log(response.data.data);
        set_user_info(response.data.data)
        setloading(false);
      }
      fetchdata();
    }
    catch (err) {
      console.log("Error in fetching user info in Userprofile page")
      console.log(err);
    }
  }, [])

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="userprofile-div">
          <div className="div-2">
            <div className="div-3">
              <div className="column">
                <div className="div-4">
                  <img src={eskoLogo} alt="Esko Logo" className="img" />
                  <div className="div-5">
                    ASSOCIATE ID:
                    <br />
                  </div>
                  <div className="div-6">
                    <input type="text" value={user_info.associate_id} readOnly />
                  </div>
                  <div className="div-7">ASSOCIATE NAME:</div>
                  <div className="div-8">
                    <input type="text" value={user_info.associate_name} readOnly />
                  </div>
                </div>
              </div>
              <div className="column-2">
                <div className="div-9">
                  <div className="div-10">
                    <div className="div-11">EMAIL:</div>
                    <div className="div-12">
                      <input type="text" value={user_info.email} readOnly />
                    </div>
                    <div className="div-13">PHONE NUMBER:</div>
                    <div className="div-14">
                      <input type="text" value={user_info.mobile_no} readOnly />
                    </div>
                  </div>
                  <div className="div-15">
                    <div className="div-16">MANAGER ID:</div>
                    <div className="div-17">
                      <input type="text" value={user_info.manager_id} readOnly />
                    </div>
                    <div className="div-18">MANAGER NAME:</div>
                    <input type="text" value={user_info.manager_name} readOnly />
                    <div className="div-19">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserProfile