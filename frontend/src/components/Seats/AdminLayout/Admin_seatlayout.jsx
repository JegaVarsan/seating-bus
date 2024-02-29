import "./Admin_seatlayout.css";
import React, { useState, useEffect, useRef } from 'react';
import { Tooltip } from '@material-ui/core';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import ToastMessage from '../ToastMessage'; // Import Toast Message 
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import { useHistory } from "react-router-dom";

import TableGroup from "../TableGroup";
import seatup from './public/seat-53@2x.png'
import seatup_imagehover from './public/armchair-3-1@2x.png'
import seatup_imageselect from './public/armchair-5-1@2x.png'
import onbookedseat from './public/armchair-6-1@2x.png'
import onblockedseat from './public/armchair-7-1@2x.png'

import {getDate} from '../../../utils/getDate'

var selectedseat = [];
var selected_blockedSeat = [];
var seat_booked_by = [];

for (let k = 0; k < 161; k++) {
  seat_booked_by.push('varsa');
}


const token = localStorage.getItem("jwt_token");

const Admin_seatlayout = () => {

  const history = useHistory();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Function to trigger toast message
  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setToastMessage('');
      window.location.reload(); // Refresh the page after 3 seconds
    }, 1000);
  };

  const location = useLocation();

  const [date, setdate] = useState(location.state.selecteddate)
  const [seat_info, set_seat_info] = useState();
  const [loading, setloading] = useState(true);
  const [seat_status, set_seat_status] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [guestEmail, setGuestEmail] = useState(''); // Define guestEmail state variable
  const [guestName, setGuestName] = useState(''); // Define guestEmail state variable


  const block = {
    padding: '20px',
    position: 'absolute',
    top: '100px',
    left: '500px'
  }

  const unblock = {
    padding: '20px',
    position: 'absolute',
    top: '100px',
    left: '1000px'
  }

  useEffect(() => {
    axios.post(`http://localhost:3000/seat/is-date-available/${date}`)
      .then((data) => {
        if (data.data.message == "The seat is not generated on this date") {
          alert("The selected date does not come under FOW")
          history.push("/adminhome");
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {



    const fetchdata = async () => {
      try {
        const val = await axios.get(`http://localhost:3000/generate_seat/get-seat-info/${date}`, {
          headers: {
            Authorization: token.toString()
          }
        });
        const array = [];
        for (let i = 0; i < 161; i++) {
          array.push(-4);
        }
        val.data.datas.forEach(element => {
          const no = parseInt(element.seat_number.match(/\d+/g)[0]);
          const status = element.seat_status;
          array[no] = status;
          seat_booked_by[no] = element.booked_for_name;
        });

        set_seat_status(array);
        set_seat_info(val.data.datas);
        setloading(false);

      }
      catch (err) {
        setloading(false);
        console.log(err);

      }
    }

    fetchdata();

  }, [])

  const blockSeat = async () => {
    var seat_numbers = []
    selectedseat.forEach(element => {
      var seatno = element.toString();
      while (seatno.length < 3) {
        seatno = '0' + seatno;
      }
      seatno = 'WKS' + seatno;
      seat_numbers.push(seatno);
    });
    const json_body = {
      date: date,
      seat_numbers: seat_numbers
    }
    console.log(json_body);
    var response = await axios.post('http://localhost:3000/generate_seat/block-seats', json_body, {
      headers: {
        Authorization: token.toString()
      }
    });
    response = response.data;
    triggerToast("Seat Blocked Successfully!"); // Trigger toast message
    console.log(response);
    console.log(`${seat_numbers} are successfully blocked`);
    // window.location.reload()
  }

  const handleBlockSeatWithGuest = async () => {
    var sn = selectedseat[0].toString();

    while (sn.length < 3) {
      sn = '0' + sn;
    }
    sn = 'WKS' + sn;

    const json_body = {
      date: date,
      seat_number: sn,
      booked_for_name: guestName,
      guest_email: guestEmail,
      is_guest: true,
    };

    console.log(json_body);

    var response=axios.post('http://localhost:3000/generate_seat/block-seat-forguest', json_body,{
      headers: {
        Authorization: token.toString()
      }
    });
        console.log(response);
        triggerToast("Seat Booked for the Guest Successfully!"); // Trigger toast message
        setShowPopup(false); // Close the popup after successful booking
        console.log(`${sn} is blocked for guest ${guestName}`);
        // window.location.reload(); // Refresh the page
      // })
      // .catch(error => {
      //   console.error("Error blocking seat for guest:", error);
      //   // Handle error if needed
      // });
  };




  const unblockSeat = async () => {
    var seat_numbers = []

    selected_blockedSeat.forEach(element => {

      var seatno = element.toString();
      while (seatno.length < 3) {
        seatno = '0' + seatno;
      }
      seatno = 'WKS' + seatno;
      seat_numbers.push(seatno);

    });

    const json_body = {
      date: date,
      seat_numbers: seat_numbers
    }
    console.log(json_body);
    var response = await axios.post('http://localhost:3000/generate_seat/unblock-seats', json_body, {
      headers: {
        Authorization: token.toString()
      }
    });
    triggerToast("Seat Un-Blocked Successfully!");
    response = response.data;
    console.log(response);
    console.log(`${seat_numbers} are successfully unblocked`);
  }

  const deleteSeat = (seatno) => {
    var t = [];
    selectedseat.forEach(element => {
      if (element != seatno) t.push(element)
    });
    return t;
  }

  const removefromblockedseat = (seatno) => {
    var t = [];
    selected_blockedSeat.forEach(element => {
      if (element != seatno) t.push(element)
    });
    return t;
  }

  const str_seat_to_int = (seatno) => {
    var str = seatno[4] + seatno[5] + seatno[6];
    return parseInt(str);
  }



  function SeatUpComponent(props) {

    const [selected, setSelected] = React.useState(false);
    const [hover, setHover] = React.useState(false);
    // console.log("Value of key "+props.seat_id)
    const seat_no = parseInt(props.seat_id.match(/\d+/g)[0]);

    // console.log(seat_no); 
    if (seat_status[seat_no] == 0) {
      return (
        <Tooltip placement="top" title={
          <div>
            <div>{props.seat_id}</div>
            <div>{seat_booked_by[str_seat_to_int(props.seat_id)]}</div>
          </div>
        } arrow>
          <img className={props.cname} src={onbookedseat} />
        </Tooltip>
      )
    }
    if (seat_status[seat_no] == 2) {

      return (
        <Tooltip placement="top" title={props.seat_id} arrow>
          <img className={props.cname} src={onblockedseat} onClick={() => {
            if (!(selected_blockedSeat.includes(seat_no))) {
              selected_blockedSeat.push(seat_no)
            }
            else {
              selected_blockedSeat = removefromblockedseat(seat_no)
            }
            console.log("selected_blockedseat " + selected_blockedSeat)
          }} />
        </Tooltip>
      )
    }
    else {

      const imgSrc_select = seatup_imageselect;
      const imgSrc_hover = seatup_imagehover;
      const imgsrc = selected ? imgSrc_select : (hover ? imgSrc_hover : seatup);
      var exKey = null;
      if (props.seat_id) {
        // console.log("Key value "+props.seat_id);
        exKey = props.seat_id;
      }
      return (
        <Tooltip placement="top" title={props.seat_id} arrow>
          <img className={props.cname} src={imgsrc} onClick={() => {
            if (!selected) {
              selectedseat.push(seat_no)
            }
            else {
              selectedseat = deleteSeat(seat_no)
            }
            console.log(selectedseat);
            setSelected(!selected)
          }} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} />
        </Tooltip>

      );


    }

  }

  function SeatDownComponent(props) {


    const [selected, setSelected] = React.useState(false);
    const [hover, setHover] = React.useState(false);
    // console.log("Value of key "+props.seat_id)
    const seat_no = parseInt(props.seat_id.match(/\d+/g)[0]);
    // console.log(seat_no); 
    if (seat_status[seat_no] == 0) {
      return (
        <Tooltip placement="top" title={
          <div>
            <div>{props.seat_id}</div>
            <div>{seat_booked_by[str_seat_to_int(props.seat_id)]}</div>
          </div>
        } arrow>
          <img className={props.cname} src={onbookedseat} style={{ rotate: "180deg" }} />
        </Tooltip>
      )
    }
    if (seat_status[seat_no] == 2) {
      // console.log("seat-no")
      return (
        <Tooltip placement="top" title={props.seat_id} arrow>
          <img className={props.cname} src={onblockedseat} style={{ rotate: "180deg" }} onClick={() => {
            if (!(selected_blockedSeat.includes(seat_no))) {
              selected_blockedSeat.push(seat_no)
            }
            else {
              selected_blockedSeat = removefromblockedseat(seat_no)
            }
            console.log("selected_blockedseat " + selected_blockedSeat)
          }} />
        </Tooltip>
      )
    }
    else {

      const imgSrc_select = seatup_imageselect;
      const imgSrc_hover = seatup_imagehover;
      const imgsrc = selected ? imgSrc_select : (hover ? imgSrc_hover : seatup);
      var exKey = null;
      if (props.seat_id) {
        // console.log("Key value "+props.seat_id);
        exKey = props.seat_id;
      }
      return (
        <Tooltip placement="top" title={props.seat_id} arrow>
          <img className={props.cname} src={imgsrc} onClick={() => {
            if (!selected) {
              selectedseat.push(seat_no)
            }
            else {
              selectedseat = deleteSeat(seat_no)
            }
            console.log(selectedseat);
            setSelected(!selected)

          }} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} style={{ rotate: "180deg" }} />
        </Tooltip>

      );
    }

  }

  function SeatLeftComponent(props) {

    const [selected, setSelected] = React.useState(false);
    const [hover, setHover] = React.useState(false);
    // console.log("Value of key "+props.seat_id)
    const seat_no = parseInt(props.seat_id.match(/\d+/g)[0]);
    // console.log(seat_no); 
    if (seat_status[seat_no] == 0) {
      return (
        <Tooltip placement="top" title={
          <div>
            <div>{props.seat_id}</div>
            <div>{seat_booked_by[str_seat_to_int(props.seat_id)]}</div>
          </div>
        } arrow>
          <img className={props.cname} src={onbookedseat} style={{ rotate: "270deg" }} />
        </Tooltip>
      )
    }
    if (seat_status[seat_no] == 2) {
      // console.log("seat-no")
      return (
        <Tooltip placement="top" title={props.seat_id} arrow>
          <img className={props.cname} src={onblockedseat} style={{ rotate: "270deg" }} onClick={() => {
            if (!(selected_blockedSeat.includes(seat_no))) {
              selected_blockedSeat.push(seat_no)
            }
            else {
              selected_blockedSeat = removefromblockedseat(seat_no)
            }
            console.log("selected_blockedseat " + selected_blockedSeat)
          }} />
        </Tooltip>
      )
    }
    else {

      const imgSrc_select = seatup_imageselect;
      const imgSrc_hover = seatup_imagehover;
      const imgsrc = selected ? imgSrc_select : (hover ? imgSrc_hover : seatup);
      var exKey = null;
      if (props.seat_id) {
        // console.log("Key value "+props.seat_id);
        exKey = props.seat_id;
      }
      return (
        <Tooltip placement="top" title={props.seat_id} arrow>
          <img className={props.cname} src={imgsrc} onClick={() => {
            if (!selected) {
              selectedseat.push(seat_no)
            }
            else {
              selectedseat = deleteSeat(seat_no)
            }
            console.log(selectedseat);
            setSelected(!selected)

          }
          } onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} style={{ rotate: "270deg" }} />
        </Tooltip>

      );
    }

  }

  function SeatRightComponent(props) {

    const [selected, setSelected] = React.useState(false);
    const [hover, setHover] = React.useState(false);
    // console.log("Value of key "+props.seat_id)
    const seat_no = parseInt(props.seat_id.match(/\d+/g)[0]);
    // console.log(seat_no); 
    if (seat_status[seat_no] == 0) {

      return (
        <Tooltip placement="top" title={
          <div>
            <div>{props.seat_id}</div>
            <div>{seat_booked_by[str_seat_to_int(props.seat_id)]}</div>
          </div>
        } arrow>
          <img className={props.cname} src={onbookedseat} style={{ rotate: "90deg" }} />
        </Tooltip>
      )
    }
    if (seat_status[seat_no] == 2) {
      // console.log("seat-no")
      return (
        <Tooltip placement="top" title={props.seat_id} arrow>
          <img className={props.cname} src={onblockedseat} style={{ rotate: "90deg" }} onClick={() => {
            if (!(selected_blockedSeat.includes(seat_no))) {
              selected_blockedSeat.push(seat_no)
            }
            else {
              selected_blockedSeat = removefromblockedseat(seat_no)
            }
            console.log("selected_blockedseat " + selected_blockedSeat)
          }} />
        </Tooltip>
      )
    }
    else {

      const imgSrc_select = seatup_imageselect;
      const imgSrc_hover = seatup_imagehover;
      const imgsrc = selected ? imgSrc_select : (hover ? imgSrc_hover : seatup);
      var exKey = null;
      if (props.seat_id) {
        // console.log("Key value "+props.seat_id);
        exKey = props.seat_id;
      }
      return (
        <Tooltip placement="top" title={props.seat_id} arrow>
          <img className={props.cname} src={imgsrc} onClick={() => {
            if (!selected) {
              selectedseat.push(seat_no)
            }
            else {
              selectedseat = deleteSeat(seat_no)
            }
            console.log(selectedseat);
            setSelected(!selected)

          }} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} style={{ rotate: "90deg" }} />
        </Tooltip>

      );
    }
  }

  const [scale, setScale] = useState(1);
  const [minScale, setMinScale] = useState(1);
  const layoutRef = useRef(null);

  // Calculate the minimum scale factor based on the dimensions of the layout content and the container
  useEffect(() => {
    const layoutWidth = layoutRef.current.offsetWidth;
    const layoutHeight = layoutRef.current.offsetHeight;
    const containerWidth = layoutRef.current.parentElement.offsetWidth;
    const containerHeight = layoutRef.current.parentElement.offsetHeight;

    // Calculate both horizontal and vertical scale factors
    const minScaleWidth = containerWidth / layoutWidth;
    const minScaleHeight = containerHeight / layoutHeight;

    // Choose the smaller scale factor to ensure both dimensions fit within the container
    const calculatedMinScale = Math.min(minScaleWidth, minScaleHeight);
    setMinScale(calculatedMinScale);
    setScale(calculatedMinScale); // Initialize scale with minimum scale
  }, []);

  const handleZoomIn = () => {
    setScale(scale + 0.1);
  };

  const handleZoomOut = () => {
    setScale(scale - 0.1);
    // if (scale > minScale) {
    //   setScale(scale - 0.1);
    // }
  };

  // Function to handle when the "Guest Block" button is clicked
  const handleGuestBlock = () => {
    setShowPopup(true);
  };
  const handleGuestBlockClose = () => {
    setShowPopup(false);
  };
  // Function to handle blocking the seat with guest details

  return (
    <>
      {showToast && <ToastMessage message={toastMessage} />}  {/* Show toast message when state is true */}
      <h1 className="admnseat-h1"><center>Admin seat management for -{getDate(date)}</center></h1>

      <div className="adminseat-buttons">
        <button onClick={blockSeat}>Block Seat</button>
        <button onClick={handleGuestBlock}>Book For Guest</button>
        <button onClick={unblockSeat}>UnBlock Seat</button>
      </div>

      <div className="manager-seat-legends">
        <div className="seatgreen">
          <div>
            <label>Selected Seat</label>
            <TrendingFlatIcon className="arrow-icon-red" />
            <img src={seatup_imageselect} alt="" />
          </div>
        </div>

        <div className="seatyellow">
          <div>
            <label>Blocked Seat</label>
            <TrendingFlatIcon className="arrow-icon-red" />
            <img src={onblockedseat} alt="" />
          </div>
        </div>

        <div className="seatred">
          <div>
            <label>Booked Seat </label>
            <TrendingFlatIcon className="arrow-icon-red" />
            <img src={onbookedseat} alt="" />
          </div>
        </div>
      </div>

      <div className="admin-zoom-control">
        <button onClick={handleZoomIn}>+</button> {/* Zoom In */}
        <button onClick={handleZoomOut}>-</button> {/* Zoom Out */}
      </div>
      <div className="AdminSeatLayout-page" >
        <div className="adminseatinnerframe" style={{ transform: `scale(${scale})` }} ref={layoutRef}>

          {loading ? (
            <div className="loader"></div>
          ) : (
            <>
              
              <TableGroup />
              <SeatLeftComponent cname="seat-icon" seat_id="WKS-140" />
              <SeatLeftComponent cname="seat-icon1" seat_id="WKS-139" />
              <SeatLeftComponent cname="seat-icon2" seat_id="WKS-138" />
              <SeatLeftComponent cname="seat-icon5" seat_id="WKS-146" />
              <SeatLeftComponent cname="seat-icon6" seat_id="WKS-144" />
              <SeatLeftComponent cname="seat-icon10" seat_id="WKS-129" />
              <SeatLeftComponent cname="seat-icon11" seat_id="WKS-128" />
              <SeatLeftComponent cname="seat-icon12" seat_id="WKS-127" />
              <SeatLeftComponent cname="seat-icon13" seat_id="WKS-126" />
              <SeatLeftComponent cname="seat-icon18" seat_id="WKS-118" />
              <SeatLeftComponent cname="seat-icon19" seat_id="WKS-117" />
              <SeatLeftComponent cname="seat-icon20" seat_id="WKS-116" />
              <SeatLeftComponent cname="seat-icon21" seat_id="WKS-115" />
              <SeatLeftComponent cname="seat-icon26" seat_id="WKS-104" />
              <SeatLeftComponent cname="seat-icon27" seat_id="WKS-103" />
              <SeatLeftComponent cname="seat-icon28" seat_id="WKS-102" />
              <SeatLeftComponent cname="seat-icon29" seat_id="WKS-101" />
              <SeatLeftComponent cname="seat-icon34" seat_id="WKS-090" />
              <SeatLeftComponent cname="seat-icon35" seat_id="WKS-089" />
              <SeatLeftComponent cname="seat-icon36" seat_id="WKS-088" />
              <SeatLeftComponent cname="seat-icon37" seat_id="WKS-087" />
              <SeatLeftComponent cname="seat-icon41" seat_id="WKS-100" />
              <SeatLeftComponent cname="seat-icon42" seat_id="WKS-099" />
              <SeatLeftComponent cname="seat-icon43" seat_id="WKS-098" />
              <SeatLeftComponent cname="seat-icon47" seat_id="WKS-114" />
              <SeatLeftComponent cname="seat-icon48" seat_id="WKS-113" />
              <SeatLeftComponent cname="seat-icon49" seat_id="WKS-112" />
              <SeatLeftComponent cname="seat-icon118" seat_id="WKS-137" />
              <SeatLeftComponent cname="seat-icon119" seat_id="WKS-136" />
              <SeatLeftComponent cname="seat-icon120" seat_id="WKS-135" />
              <SeatLeftComponent cname="seat-icon121" seat_id="WKS-134" />
              <SeatLeftComponent cname="seat-icon105" seat_id="WKS-085" />
              <SeatLeftComponent cname="seat-icon106" seat_id="WKS-086" />
              <SeatLeftComponent cname="seat-icon126" seat_id="WKS-152" />
              <SeatLeftComponent cname="seat-icon127" seat_id="WKS-151" />
              <SeatLeftComponent cname="seat-icon128" seat_id="WKS-150" />
              <SeatLeftComponent cname="seat-icon132" seat_id="WKS-158" />
              <SeatLeftComponent cname="seat-icon133" seat_id="WKS-157" />
              <SeatLeftComponent cname="seat-icon134" seat_id="WKS-156" />

              <SeatRightComponent cname="seat-icon3" seat_id="WKS-141" />
              <SeatRightComponent cname="seat-icon4" seat_id="WKS-143" />
              <SeatRightComponent cname="seat-icon7" seat_id="WKS-147" />
              <SeatRightComponent cname="seat-icon8" seat_id="WKS-148" />
              <SeatRightComponent cname="seat-icon9" seat_id="WKS-149" />
              <SeatRightComponent cname="seat-icon14" seat_id="WKS-119" />
              <SeatRightComponent cname="seat-icon15" seat_id="WKS-120" />
              <SeatRightComponent cname="seat-icon16" seat_id="WKS-121" />
              <SeatRightComponent cname="seat-icon17" seat_id="WKS-122" />
              <SeatRightComponent cname="seat-icon22" seat_id="WKS-105" />
              <SeatRightComponent cname="seat-icon23" seat_id="WKS-106" />
              <SeatRightComponent cname="seat-icon24" seat_id="WKS-107" />
              <SeatRightComponent cname="seat-icon25" seat_id="WKS-108" />
              <SeatRightComponent cname="seat-icon30" seat_id="WKS-091" />
              <SeatRightComponent cname="seat-icon31" seat_id="WKS-092" />
              <SeatRightComponent cname="seat-icon32" seat_id="WKS-093" />
              <SeatRightComponent cname="seat-icon33" seat_id="WKS-094" />
              <SeatRightComponent cname="seat-icon38" seat_id="WKS-123" />
              <SeatRightComponent cname="seat-icon39" seat_id="WKS-124" />
              <SeatRightComponent cname="seat-icon40" seat_id="WKS-125" />
              <SeatRightComponent cname="seat-icon44" seat_id="WKS-095" />
              <SeatRightComponent cname="seat-icon45" seat_id="WKS-096" />
              <SeatRightComponent cname="seat-icon46" seat_id="WKS-097" />
              <SeatRightComponent cname="seat-icon50" seat_id="WKS-109" />
              <SeatRightComponent cname="seat-icon51" seat_id="WKS-110" />
              <SeatRightComponent cname="seat-icon52" seat_id="WKS-111" />
              <SeatRightComponent cname="seat-icon122" seat_id="WKS-130" />
              <SeatRightComponent cname="seat-icon123" seat_id="WKS-131" />
              <SeatRightComponent cname="seat-icon124" seat_id="WKS-132" />
              <SeatRightComponent cname="seat-icon125" seat_id="WKS-133" />
              <SeatRightComponent cname="seat-icon129" seat_id="WKS-153" />
              <SeatRightComponent cname="seat-icon130" seat_id="WKS-154" />
              <SeatRightComponent cname="seat-icon131" seat_id="WKS-155" />
              <SeatRightComponent cname="seat-icon135" seat_id="WKS-159" />
              <SeatRightComponent cname="seat-icon136" seat_id="WKS-160" />

              <SeatUpComponent cname="seat-icon53" seat_id="WKS-068"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon54" seat_id="WKS-069"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon55" seat_id="WKS-070"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon56" seat_id="WKS-071"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon57" seat_id="WKS-072"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon58" seat_id="WKS-073"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon65" seat_id="WKS-056"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon66" seat_id="WKS-057"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon67" seat_id="WKS-058"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon68" seat_id="WKS-059"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon69" seat_id="WKS-060"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon70" seat_id="WKS-061"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon77" seat_id="WKS-044" />
              <SeatUpComponent cname="seat-icon78" seat_id="WKS-045" />
              <SeatUpComponent cname="seat-icon79" seat_id="WKS-046" />
              <SeatUpComponent cname="seat-icon80" seat_id="WKS-047" />
              <SeatUpComponent cname="seat-icon81" seat_id="WKS-048" />
              <SeatUpComponent cname="seat-icon82" seat_id="WKS-049" />
              <SeatUpComponent cname="seat-icon89" seat_id="WKS-013"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon90" seat_id="WKS-014"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon91" seat_id="WKS-015"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon92" seat_id="WKS-016"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon93" seat_id="WKS-006"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon94" seat_id="WKS-005"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon95" seat_id="WKS-004"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon96" seat_id="WKS-003"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon97" seat_id="WKS-002"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon98" seat_id="WKS-001"></SeatUpComponent>
              <SeatUpComponent cname="seat-26-icon" seat_id="WKS-021" />
              <SeatUpComponent cname="seat-25-icon" seat_id="WKS-022" />
              <SeatUpComponent cname="seat-24-icon" seat_id="WKS-023" />
              <SeatUpComponent cname="seat-23-icon" seat_id="WKS-024" />
              <SeatUpComponent cname="seat-22-icon" seat_id="WKS-025" />
              <SeatUpComponent cname="seat-21-icon" seat_id="WKS-026" />
              <SeatUpComponent cname="table-group-icon" seat_id="WKS-033"></SeatUpComponent>
              <SeatUpComponent cname="table-group-icon1" seat_id="WKS-034"></SeatUpComponent>
              <SeatUpComponent cname="table-group-icon2" seat_id="WKS-035"></SeatUpComponent>
              <SeatUpComponent cname="table-group-icon3" seat_id="WKS-036"></SeatUpComponent>
              <SeatUpComponent cname="table-group-icon4" seat_id="WKS-037"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon107" seat_id="WKS-079"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon108" seat_id="WKS-080"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon109" seat_id="WKS-081"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon110" seat_id="WKS-082"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon111" seat_id="WKS-083"></SeatUpComponent>
              <SeatUpComponent cname="seat-icon112" seat_id="WKS-084"></SeatUpComponent>

              <SeatDownComponent cname="seat-icon59" seat_id="WKS-067" />
              <SeatDownComponent cname="seat-icon60" seat_id="WKS-066" />
              <SeatDownComponent cname="seat-icon61" seat_id="WKS-065" />
              <SeatDownComponent cname="seat-icon62" seat_id="WKS-064" />
              <SeatDownComponent cname="seat-icon63" seat_id="WKS-063" />
              <SeatDownComponent cname="seat-icon64" seat_id="WKS-062" />
              <SeatDownComponent cname="seat-icon71" seat_id="WKS-055" />
              <SeatDownComponent cname="seat-icon72" seat_id="WKS-054" />
              <SeatDownComponent cname="seat-icon73" seat_id="WKS-053" />
              <SeatDownComponent cname="seat-icon74" seat_id="WKS-052" />
              <SeatDownComponent cname="seat-icon75" seat_id="WKS-051" />
              <SeatDownComponent cname="seat-icon76" seat_id="WKS-050" />
              <SeatDownComponent cname="seat-icon83" seat_id="WKS-043" />
              <SeatDownComponent cname="seat-icon84" seat_id="WKS-042" />
              <SeatDownComponent cname="seat-icon85" seat_id="WKS-041" />
              <SeatDownComponent cname="seat-icon86" seat_id="WKS-040" />
              <SeatDownComponent cname="seat-icon87" seat_id="WKS-039" />
              <SeatDownComponent cname="seat-icon88" seat_id="WKS-038" />
              <SeatDownComponent cname="seat-20-icon" seat_id="WKS-020" />
              <SeatDownComponent cname="seat-19-icon" seat_id="WKS-019" />
              <SeatDownComponent cname="seat-18-icon" seat_id="WKS-018" />
              <SeatDownComponent cname="seat-17-icon" seat_id="WKS-017" />
              <SeatDownComponent cname="seat-12-icon" seat_id="WKS-007" />
              <SeatDownComponent cname="seat-11-icon" seat_id="WKS-008" />
              <SeatDownComponent cname="seat-10-icon" seat_id="WKS-009" />
              <SeatDownComponent cname="seat-9-icon" seat_id="WKS-010" />
              <SeatDownComponent cname="seat-8-icon" seat_id="WKS-011" />
              <SeatDownComponent cname="seat-7-icon" seat_id="WKS-012" />
              <SeatDownComponent cname="seat-icon99" seat_id="WKS-032" />
              <SeatDownComponent cname="seat-icon100" seat_id="WKS-031" />
              <SeatDownComponent cname="seat-icon101" seat_id="WKS-030" />
              <SeatDownComponent cname="seat-icon102" seat_id="WKS-029" />
              <SeatDownComponent cname="seat-icon103" seat_id="WKS-028" />
              <SeatDownComponent cname="seat-icon104" seat_id="WKS-027" />
              <SeatDownComponent cname="seat-icon113" seat_id="WKS-078" />
              <SeatDownComponent cname="seat-icon114" seat_id="WKS-077" />
              <SeatDownComponent cname="seat-icon115" seat_id="WKS-076" />
              <SeatDownComponent cname="seat-icon116" seat_id="WKS-075" />
              <SeatDownComponent cname="seat-icon117" seat_id="WKS-074" />

              <div className="table-group">
                <div className="table-158" />
                <div className="table-157" />
                <div className="table-156" />
                <div className="table-155" />
                <div className="table-154" />
              </div>

              <div className="table-group1">
                <div className="table-153" />
                <div className="table-152" />
                <div className="table-151" />
                <div className="table-150" />
                <div className="table-149" />
              </div>

              <div className="table-group2">
                <div className="table-129" />
                <div className="table-128" />
                <div className="table-127" />
                <div className="table-126" />
                <div className="table-125" />
                <div className="table-124" />
                <div className="table-123" />
                <div className="table-122" />
              </div>

              <div className="table-group3">
                <div className="table-121" />
                <div className="table-120" />
                <div className="table-119" />
                <div className="table-118" />
                <div className="table-117" />
                <div className="table-116" />
                <div className="table-115" />
                <div className="table-114" />
              </div>

              <div className="table-group4">
                <div className="table-113" />
                <div className="table-112" />
                <div className="table-111" />
                <div className="table-110" />
                <div className="table-109" />
                <div className="table-108" />
                <div className="table-107" />
                <div className="table-106" />
              </div>

              <div className="table-group5">
                <div className="table-105" />
                <div className="table-104" />
                <div className="table-103" />
                <div className="table-102" />
              </div>

              <div className="table-group6">
                <div className="table-101" />
                <div className="table-100" />
                <div className="table-99" />
              </div>

              <div className="table-group7">
                <div className="table-92" />
                <div className="table-91" />
                <div className="table-90" />
                <div className="table-89" />
                <div className="table-88" />
                <div className="table-87" />
              </div>

              <div className="table-group8">
                <div className="table-921" />
                <div className="table-911" />
                <div className="table-901" />
                <div className="table-891" />
                <div className="table-881" />
                <div className="table-871" />
              </div>

              <div className="table-group9">
                <div className="table-73" />
                <div className="table-72" />
                <div className="table-71" />
                <div className="table-70" />
                <div className="table-69" />
                <div className="table-68" />
                <div className="table-67" />
                <div className="table-66" />
                <div className="table-65" />
                <div className="table-64" />
                <div className="table-63" />
                <div className="table-62" />
              </div>

              <div className="table-group10">
                <div className="table-61" />
                <div className="table-60" />
                <div className="table-59" />
                <div className="table-58" />
                <div className="table-57" />
                <div className="table-56" />
                <div className="table-55" />
                <div className="table-54" />
                <div className="table-53" />
                <div className="table-52" />
                <div className="table-51" />
                <div className="table-50" />
              </div>

              <div className="table-group11">
                <div className="table-49" />
                <div className="table-48" />
                <div className="table-47" />
                <div className="table-46" />
                <div className="table-45" />
                <div className="table-44" />
                <div className="table-43" />
                <div className="table-42" />
                <div className="table-41" />
                <div className="table-40" />
                <div className="table-39" />
                <div className="table-38" />
              </div>

              <div className="n-o-c-room-marker">
                <div className="table-6" />
                <div className="table-5" />
                <div className="table-4" />
                <div className="table-3" />
                <div className="table-2" />
                <div className="table-1" />
              </div>
              {/* <input className="noc-room-rect" type="text" /> */}
              <div className="noc-room">NOC ROOM</div>

              <div className="table-group12">
                <div className="table-26" />
                <div className="table-25" />
                <div className="table-24" />
                <div className="table-23" />
                <div className="table-22" />
                <div className="table-21" />
                <div className="table-20" />
                <div className="table-19" />
                <div className="table-18" />
                <div className="table-17" />
              </div>

              <div className="table-group13">
                <div className="table-16" />
                <div className="table-15" />
                <div className="table-14" />
                <div className="table-13" />
                <div className="table-12" />
                <div className="table-11" />
                <div className="table-10" />
                <div className="table-9" />
                <div className="table-8" />
                <div className="table-7" />
              </div>

              <div className="table-group14">
                <div className="table-37" />
                <div className="table-36" />
                <div className="table-35" />
                <div className="table-34" />
                <div className="table-33" />
                <div className="table-32" />
                <div className="table-31" />
                <div className="table-30" />
                <div className="table-29" />
                <div className="table-28" />
                <div className="table-27" />
              </div>

              <div className="table-group15">
                <div className="rectangle-pair" />
                <div className="rectangle-pair1" />
              </div>

              <div className="table-group16">
                <div className="table-84" />
                <div className="table-83" />
                <div className="table-82" />
                <div className="table-81" />
                <div className="table-80" />
                <div className="table-79" />
                <div className="table-78" />
                <div className="table-77" />
                <div className="table-76" />
                <div className="table-75" />
                <div className="table-74" />
              </div>

              <div className="table-group17">
                <div className="table-137" />
                <div className="table-136" />
                <div className="table-135" />
                <div className="table-134" />
                <div className="table-133" />
                <div className="table-132" />
                <div className="table-131" />
                <div className="table-130" />
              </div>

              <div className="table-group18">
                <div className="table-148" />
                <div className="table-147" />
                <div className="table-146" />
                <div className="table-145" />
                <div className="table-144" />
                <div className="table-143" />
              </div>

              <div className="inner-tables">
                <div className="table-142" />
                <div className="table-141" />
                <div className="table-140" />
                <div className="table-139" />
                <div className="table-138" />
              </div>

            </>

          )}
        </div>
        {/* BELOW IS THE CODE FOR POP-UP */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>Block Seats</h2>
              <input
                type="text"
                placeholder="Enter Guest Name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Enter Guest Email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                required
              />
              <div className="guestblockmanagebtns">
                <button onClick={handleBlockSeatWithGuest}>Book Seat</button>
                <button onClick={handleGuestBlockClose}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Admin_seatlayout;

