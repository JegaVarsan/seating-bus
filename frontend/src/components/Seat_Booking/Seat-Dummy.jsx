import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import seat from './assets/seat-1.png'
import pollengrass from './assets/meteoconspollengrass0-cyj.png'
import onhowerseat from './assets/armchair-3-2.png'
import onselectseat from './assets/armchair-5-1.png'
import onbookedseat from './assets/armchair-6-1.png'
import onblockedseat from './assets/armchair-7-1.png'
import grass from "./assets/group-159.png"


import vectorqzu from "./assets/vector-qzu.png"
import vectord9o from "./assets/vector-d9o.png"
import vector97K from "./assets/vector-97K.png"
import vectorSjP from "./assets/vector-SjP.png"
import vectorUqB from "./assets/vector-UqB.png"
import vector from "./assets/vector.png"
import vectorLiy from "./assets/vector-Liy.png"
import vectorzAy from "./assets/vector-zAy.png"
import vector1bT from "./assets/vector-1bT.png"
import vector1Ks from "./assets/vector-1Ks.png"
import vector2Ld from "./assets/vector-2Ld.png"
import vectord73 from "./assets/vector-d73.png"
import vectortFw from "./assets/vector-tFw.png"
import vectorLkd from "./assets/vector-Lkd.png"

import sofa1 from "./assets/mdi-stool-zW1.png"
import sofa2 from "./assets/mdi-stool.png"
import sofa3 from "./assets/bitcoin-icons-sofa-filled.png"

import './styles/frame-1.css'


function SeatLayout() {

    const [date, setdate] = useState("2024-02-16")
    const [seat_info, set_seat_info] = useState();
    const [loading, setloading] = useState(true);
    const [seat_status, set_seat_status] = useState([])

    function ImageToggle({ defaultSrc, hoverSrc, selectedSrc, clsname, style }) {
        const [isHovered, setIsHovered] = useState(false);
        const [isSelected, setIsSelected] = useState(false);

        const imageSource = isSelected ? selectedSrc : (isHovered ? hoverSrc : defaultSrc);

        return (
            <img
                src={imageSource}
                alt="Image"
                style={style}
                className={clsname}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
                onClick={() => {
                    setIsSelected(!isSelected)
                }}
            />
        );
    }

    useEffect(() => {

        const fetchdata = async () => {
            try {
                const val = await axios.get(`http://localhost:3000/generate_seat/get-seat-info/${date}`);
                const array = [];
                for (let i = 0; i < 161; i++) {
                    array.push(-4);
                }
                val.data.datas.forEach(element => {
                    const no = parseInt(element.seat_number.match(/\d+/g)[0]);
                    const status = element.seat_status;
                    array[no] = status;
                });

                set_seat_status(array);
                set_seat_info(val.data.datas);

                setTimeout(() => {
                    console.log(seat_status[2]);
                }, 4000);

                setloading(false);

            }
            catch (err) {
                setloading(false);
                console.log(err);

            }
        }

        fetchdata();

    }, [])

    return (
        <>
            {loading ? (
                <h1>Loading</h1>
            ) : (
                <div>
                    <meta charSet="utf-8" />
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="theme-color" content="#000000" />
                    <title>Frame 1</title>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Inter%3A400%2C800"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro%3A400%2C800"
                    />
                    <link rel="stylesheet" href="./styles/frame-1.css" />

                    <div className="frame-1-8iR">
                        <div className="auto-group-9yz1-o3s">
                            <div className="auto-group-6axd-iyT">
                                <div className="group-166-Bc9">
                                    <div className="group-1-Fru">
                                        <div className="table-1-CGM"></div>

                                        {console.log(seat_status)}

                                        {seat_status[1] == 1 ? (
                                            <ImageToggle
                                                key={1}
                                                defaultSrc={seat}
                                                hoverSrc={onhowerseat}
                                                selectedSrc={onselectseat}
                                                clsname="seat-1-JMK"
                                                style={{ rotate: "180deg" }}
                                            />
                                        )
                                            : seat_status[1] == 2 ? (
                                                <img alt="IMGGG"
                                                    style={{ rotate: "180deg" }}
                                                    className="seat-1-JMK"
                                                    src={onblockedseat}
                                                />
                                            )
                                                : (
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "180deg" }}
                                                        className="seat-1-JMK"
                                                        src={onbookedseat}
                                                    />
                                                )}


                                    </div>
                                    <div className="group-2-qMF">
                                        <div className="table-2-PNm"></div>

                                        {seat_status[2] == 1 ? (
                                            <ImageToggle
                                                key={2}
                                                defaultSrc={seat}
                                                hoverSrc={onhowerseat}
                                                selectedSrc={onselectseat}
                                                clsname="seat-2-jxR"
                                                style={{ rotate: "180deg" }}
                                            />
                                        )
                                            : seat_status[2] == 2 ? (
                                                <img alt="IMGGG"
                                                    style={{ rotate: "180deg" }}
                                                    className="seat-2-jxR"
                                                    src={onblockedseat}
                                                />
                                            )
                                                : (
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "180deg" }}
                                                        className="seat-2-jxR"
                                                        src={onbookedseat}
                                                    />
                                                )}



                                    </div>
                                    <div className="group-3-eJh">
                                        <div className="table-3-Cb7"></div>
                                        {seat_status[3] == 1 ? (
                                            <ImageToggle
                                                key={3}
                                                defaultSrc={seat}
                                                hoverSrc={onhowerseat}
                                                selectedSrc={onselectseat}
                                                clsname="seat-3-XdP"
                                                style={{ rotate: "180deg" }}
                                            />
                                        )
                                            : seat_status[3] == 2 ? (
                                                <img alt="IMGGG"
                                                    style={{ rotate: "180deg" }}
                                                    className="seat-3-XdP"
                                                    src={onblockedseat}
                                                />
                                            )
                                                : (
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "180deg" }}
                                                        className="seat-3-XdP"
                                                        src={onbookedseat}
                                                    />
                                                )}


                                    </div>
                                    <div className="group-4-eT7">
                                        <div className="table-4-DFK"></div>
                                        {seat_status[4] == 1 ? (
                                            <ImageToggle
                                                key={4}
                                                defaultSrc={seat}
                                                hoverSrc={onhowerseat}
                                                selectedSrc={onselectseat}
                                                clsname="seat-4-AwF"
                                                style={{ rotate: "180deg" }}
                                            />
                                        )
                                            : seat_status[4] == 2 ? (
                                                <img alt="IMGGG"
                                                    style={{ rotate: "180deg" }}
                                                    className="seat-4-AwF"
                                                    src={onblockedseat}
                                                />
                                            )
                                                : (
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "180deg" }}
                                                        className="seat-4-AwF"
                                                        src={onbookedseat}
                                                    />
                                                )}


                                    </div>
                                    <div className="group-5-udw">
                                        <div className="table-5-rZB"></div>
                                        {seat_status[5] == 1 ? (
                                            <ImageToggle
                                                key={5}
                                                defaultSrc={seat}
                                                hoverSrc={onhowerseat}
                                                selectedSrc={onselectseat}
                                                clsname="seat-5-1gy"
                                                style={{ rotate: "180deg" }}
                                            />
                                        )
                                            : seat_status[5] == 2 ? (
                                                <img alt="IMGGG"
                                                    style={{ rotate: "180deg" }}
                                                    className="seat-5-1gy"
                                                    src={onblockedseat}
                                                />
                                            )
                                                : (
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "180deg" }}
                                                        className="seat-5-1gy"
                                                        src={onbookedseat}
                                                    />
                                                )}


                                    </div>
                                    <div className="group-6-mAM">
                                        <div className="table-6-XQR"></div>

                                        {seat_status[6] == 1 ? (
                                            <ImageToggle
                                                key={6}
                                                defaultSrc={seat}
                                                hoverSrc={onhowerseat}
                                                selectedSrc={onselectseat}
                                                clsname="seat-6-V6M"
                                                style={{ rotate: "180deg" }}
                                            />
                                        )
                                            : seat_status[6] == 2 ? (
                                                <img alt="IMGGG"
                                                    style={{ rotate: "180deg" }}
                                                    className="seat-6-V6M"
                                                    src={onblockedseat}
                                                />
                                            )
                                                : (
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "180deg" }}
                                                        className="seat-6-V6M"
                                                        src={onbookedseat}
                                                    />
                                                )}

                                    </div>
                                </div>
                                <div className="auto-group-jwau-Rkh">
                                    <div className="group-16-yGR">
                                        <div className="table-16-uA5"></div>

                                        {seat_status[16] == 1 ? (
                                            <ImageToggle
                                                key={16}
                                                defaultSrc={seat}
                                                hoverSrc={onhowerseat}
                                                selectedSrc={onselectseat}
                                                clsname="seat-16-Ei9"
                                                style={{ rotate: "180deg" }}
                                            />
                                        )
                                            : seat_status[16] == 2 ? (
                                                <img alt="IMGGG"
                                                    style={{ rotate: "180deg" }}
                                                    className="seat-16-Ei9"
                                                    src={onblockedseat}
                                                />
                                            )
                                                : (
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "180deg" }}
                                                        className="seat-16-Ei9"
                                                        src={onbookedseat}
                                                    />
                                                )}



                                        {/* <img alt="IMGGG"
                    style={{ rotate: "180deg" }}
                    className="seat-16-Ei9"
                    src={seat}
                  /> */}
                                    </div>
                                    <div className="group-15-kgV">
                                        <div className="table-15-Ve5"></div>

                                        {seat_status[15] == 1 ? (
                                            <ImageToggle
                                                key={15}
                                                defaultSrc={seat}
                                                hoverSrc={onhowerseat}
                                                selectedSrc={onselectseat}
                                                clsname="seat-15-e1B"
                                                style={{ rotate: "180deg" }}
                                            />
                                        )
                                            : seat_status[1] == 2 ? (
                                                <img alt="IMGGG"
                                                    style={{ rotate: "180deg" }}
                                                    className="seat-15-e1B"
                                                    src={onblockedseat}
                                                />
                                            )
                                                : (
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "180deg" }}
                                                        className="seat-15-e1B"
                                                        src={onbookedseat}
                                                    />
                                                )}

                                        {/* <img alt="IMGGG"
                    style={{ rotate: "180deg" }}
                    className="seat-15-e1B"
                    src={seat}
                  /> */}
                                    </div>
                                    <div className="group-14-Nxm">
                                        <div className="table-14-Kd7"></div>
                                        <img alt="IMGGG"
                                            style={{ rotate: "180deg" }}
                                            className="seat-14-H49 seat"
                                            src={seat}
                                        />
                                    </div>
                                    <div className="group-13-q5f">
                                        <div className="table-13-aJ9"></div>
                                        <img alt="IMGGG"
                                            style={{ rotate: "180deg" }}
                                            className="seat-13-8aZ"
                                            src={seat}
                                        />
                                    </div>
                                    <div className="group-169-SLM">
                                        <div className="auto-group-lqcu-ahT">
                                            <div className="auto-group-pkqf-vmK">
                                                <p className="pillar-Rxy" />
                                            </div>
                                            <div className="auto-group-t549-757">
                                                <div className="group-21-eaq">
                                                    <div className="table-21-CcM"></div>
                                                    {seat_status[21] == 1 ? (
                                                        <ImageToggle
                                                            key={21}
                                                            defaultSrc={seat}
                                                            hoverSrc={onhowerseat}
                                                            selectedSrc={onselectseat}
                                                            clsname="seat-21-k85"
                                                            style={{ rotate: "180deg" }}
                                                        />
                                                    )
                                                        : seat_status[1] == 2 ? (
                                                            <img alt="IMGGG"
                                                                style={{ rotate: "180deg" }}
                                                                className="seat-21-k85"
                                                                src={onblockedseat}
                                                            />
                                                        )
                                                            : (
                                                                <img alt="IMGGG"
                                                                    style={{ rotate: "180deg" }}
                                                                    className="seat-21-k85"
                                                                    src={onbookedseat}
                                                                />
                                                            )}

                                                </div>
                                                <div className="group-22-tzy">
                                                    <div className="table-22-dxZ"></div>
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "180deg" }}
                                                        className="seat-22-zo7"
                                                        src={seat}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="auto-group-7dg1-tdb">
                                            <div className="auto-group-nu3b-nU5">
                                                <div className="group-17-RG9">
                                                    {seat_status[17] == 1 ? (
                                                        <ImageToggle
                                                            key={17}
                                                            defaultSrc={seat}
                                                            hoverSrc={onhowerseat}
                                                            selectedSrc={onselectseat}
                                                            clsname="seat-17-PCy"

                                                        />
                                                    )
                                                        : seat_status[17] == 2 ? (
                                                            <img alt="IMGGG"

                                                                className="seat-17-PCy"
                                                                src={onblockedseat}
                                                            />
                                                        )
                                                            : (
                                                                <img alt="IMGGG"

                                                                    className="seat-17-PCy"
                                                                    src={onbookedseat}
                                                                />
                                                            )}

                                                    <div className="table-17-hjT"></div>
                                                </div>
                                                <div className="group-23-TyX">
                                                    <div className="table-23-8Jy"></div>
                                                    {seat_status[23] == 1 ? (
                                                        <ImageToggle
                                                            key={23}
                                                            defaultSrc={seat}
                                                            hoverSrc={onhowerseat}
                                                            selectedSrc={onselectseat}
                                                            clsname="seat-23-GRB"
                                                            style={{ rotate: "180deg" }}
                                                        />
                                                    )
                                                        : seat_status[23] == 2 ? (
                                                            <img alt="IMGGG"
                                                                style={{ rotate: "180deg" }}
                                                                className="seat-23-GRB"
                                                                src={onblockedseat}
                                                            />
                                                        )
                                                            : (
                                                                <img alt="IMGGG"
                                                                    style={{ rotate: "180deg" }}
                                                                    className="seat-23-GRB"
                                                                    src={onbookedseat}
                                                                />
                                                            )}

                                                </div>
                                            </div>
                                            <div className="auto-group-yc2h-pBo">
                                                <div className="group-18-yaV">
                                                    {seat_status[18] == 1 ? (
                                                        <ImageToggle
                                                            key={18}
                                                            defaultSrc={seat}
                                                            hoverSrc={onhowerseat}
                                                            selectedSrc={onselectseat}
                                                            clsname="seat-18-Xru"

                                                        />
                                                    )
                                                        : seat_status[1] == 2 ? (
                                                            <img alt="IMGGG"

                                                                className="seat-18-Xru"
                                                                src={onblockedseat}
                                                            />
                                                        )
                                                            : (
                                                                <img alt="IMGGG"

                                                                    className="seat-18-Xru"
                                                                    src={onbookedseat}
                                                                />
                                                            )}

                                                    <div className="table-18-5Nd"></div>
                                                </div>
                                                <div className="group-24-SU5">
                                                    <div className="table-24-b65"></div>
                                                    {seat_status[24] == 1 ? (
                                                        <ImageToggle
                                                            key={24}
                                                            defaultSrc={seat}
                                                            hoverSrc={onhowerseat}
                                                            selectedSrc={onselectseat}
                                                            clsname="seat-24-Yn1"
                                                            style={{ rotate: "180deg" }}
                                                        />
                                                    )
                                                        : seat_status[24] == 2 ? (
                                                            <img alt="IMGGG"
                                                                style={{ rotate: "180deg" }}
                                                                className="seat-24-Yn1"
                                                                src={onblockedseat}
                                                            />
                                                        )
                                                            : (
                                                                <img alt="IMGGG"
                                                                    style={{ rotate: "180deg" }}
                                                                    className="seat-24-Yn1"
                                                                    src={onbookedseat}
                                                                />
                                                            )}

                                                </div>
                                            </div>
                                            <div className="auto-group-7ta1-hQ1">
                                                <div className="group-19-4VT">
                                                    {seat_status[19] == 1 ? (
                                                        <ImageToggle
                                                            key={19}
                                                            defaultSrc={seat}
                                                            hoverSrc={onhowerseat}
                                                            selectedSrc={onselectseat}
                                                            clsname="seat-19-mPs"

                                                        />
                                                    )
                                                        : seat_status[1] == 2 ? (
                                                            <img alt="IMGGG"

                                                                className="seat-19-mPs"
                                                                src={onblockedseat}
                                                            />
                                                        )
                                                            : (
                                                                <img alt="IMGGG"

                                                                    className="seat-19-mPs"
                                                                    src={onbookedseat}
                                                                />
                                                            )}
                                                    {/* <img alt="IMGGG" className="seat-19-mPs" src={seat} /> */}
                                                    <div className="table-19-uky"></div>
                                                </div>
                                                <div className="group-25-fEM">
                                                    <div className="table-25-c9b"></div>
                                                    {seat_status[25] == 1 ? (
                                                        <ImageToggle
                                                            key={25}
                                                            defaultSrc={seat}
                                                            hoverSrc={onhowerseat}
                                                            selectedSrc={onselectseat}
                                                            clsname="seat-25-mYH"
                                                            style={{ rotate: "180deg" }}
                                                        />
                                                    )
                                                        : seat_status[25] == 2 ? (
                                                            <img alt="IMGGG"
                                                                style={{ rotate: "180deg" }}
                                                                className="seat-25-mYH"
                                                                src={onblockedseat}
                                                            />
                                                        )
                                                            : (
                                                                <img alt="IMGGG"
                                                                    style={{ rotate: "180deg" }}
                                                                    className="seat-25-mYH"
                                                                    src={onbookedseat}
                                                                />
                                                            )}

                                                </div>
                                            </div>
                                            <div className="auto-group-znwh-6qT">
                                                <div className="group-26-fNm">
                                                    <div className="table-26-pFf"></div>
                                                    {seat_status[26] == 1 ? (
                                                        <ImageToggle
                                                            key={26}
                                                            defaultSrc={seat}
                                                            hoverSrc={onhowerseat}
                                                            selectedSrc={onselectseat}
                                                            clsname="seat-26-MWV"
                                                            style={{ rotate: "180deg" }}
                                                        />
                                                    )
                                                        : seat_status[26] == 2 ? (
                                                            <img alt="IMGGG"
                                                                style={{ rotate: "180deg" }}
                                                                className="seat-26-MWV"
                                                                src={onblockedseat}
                                                            />
                                                        )
                                                            : (
                                                                <img alt="IMGGG"
                                                                    style={{ rotate: "180deg" }}
                                                                    className="seat-26-MWV"
                                                                    src={onbookedseat}
                                                                />
                                                            )}

                                                </div>
                                                <div className="group-20-HQ9">
                                                    {seat_status[20] == 1 ? (
                                                        <ImageToggle
                                                            key={20}
                                                            defaultSrc={seat}
                                                            hoverSrc={onhowerseat}
                                                            selectedSrc={onselectseat}
                                                            clsname="seat-20-3PK"

                                                        />
                                                    )
                                                        : seat_status[20] == 2 ? (
                                                            <img alt="IMGGG"

                                                                className="seat-20-3PK"
                                                                src={onblockedseat}
                                                            />
                                                        )
                                                            : (
                                                                <img alt="IMGGG"

                                                                    className="seat-20-3PK"
                                                                    src={onbookedseat}
                                                                />
                                                            )}

                                                    <div className="table-20-PTB"></div>
                                                </div>

                                                <img alt="IMGGG" className="group-164-vCD" src={grass} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="group-167-Ruf">
                                        <div className="auto-group-bp9t-BP3">
                                            <div className="group-7-7nV">
                                                {seat_status[7] == 1 ? (
                                                    <ImageToggle
                                                        key={7}
                                                        defaultSrc={seat}
                                                        hoverSrc={onhowerseat}
                                                        selectedSrc={onselectseat}
                                                        clsname="seat-7-V8q"

                                                    />
                                                )
                                                    : seat_status[7] == 2 ? (
                                                        <img alt="IMGGG"
                                                            className="seat-7-V8q"
                                                            src={onblockedseat}
                                                        />
                                                    )
                                                        : (
                                                            <img alt="IMGGG"
                                                                className="seat-7-V8q"
                                                                src={onbookedseat}
                                                            />
                                                        )}

                                                <div className="table-7-bBs"></div>
                                            </div>
                                            <div className="group-8-Z8h">
                                                {seat_status[8] == 1 ? (
                                                    <ImageToggle
                                                        key={8}
                                                        defaultSrc={seat}
                                                        hoverSrc={onhowerseat}
                                                        selectedSrc={onselectseat}
                                                        clsname="seat-8-7vu"

                                                    />
                                                )
                                                    : seat_status[8] == 2 ? (
                                                        <img alt="IMGGG"

                                                            className="seat-8-7vu"
                                                            src={onblockedseat}
                                                        />
                                                    )
                                                        : (
                                                            <img alt="IMGGG"

                                                                className="seat-8-7vu"
                                                                src={onbookedseat}
                                                            />
                                                        )}

                                                <div className="table-8-Dyw"></div>
                                            </div>
                                            <div className="group-9-zUu">
                                                {seat_status[9] == 1 ? (
                                                    <ImageToggle
                                                        key={9}
                                                        defaultSrc={seat}
                                                        hoverSrc={onhowerseat}
                                                        selectedSrc={onselectseat}
                                                        clsname="seat-9-MqF"

                                                    />
                                                )
                                                    : seat_status[9] == 2 ? (
                                                        <img alt="IMGGG"

                                                            className="seat-9-MqF"
                                                            src={onblockedseat}
                                                        />
                                                    )
                                                        : (
                                                            <img alt="IMGGG"

                                                                className="seat-9-MqF"
                                                                src={onbookedseat}
                                                            />
                                                        )}

                                                <div className="table-9-Hiu"></div>
                                            </div>
                                            <div className="group-10-rX7">
                                                {seat_status[10] == 1 ? (
                                                    <ImageToggle
                                                        key={10}
                                                        defaultSrc={seat}
                                                        hoverSrc={onhowerseat}
                                                        selectedSrc={onselectseat}
                                                        clsname="seat-10-R4R"
                                                        style={{ rotate: "180deg" }}
                                                    />
                                                )
                                                    : seat_status[10] == 2 ? (
                                                        <img alt="IMGGG"

                                                            className="seat-10-R4R"
                                                            src={onblockedseat}
                                                        />
                                                    )
                                                        : (
                                                            <img alt="IMGGG"

                                                                className="seat-10-R4R"
                                                                src={onbookedseat}
                                                            />
                                                        )}

                                                <div className="table-10-k6h"></div>
                                            </div>
                                            <div className="group-11-i3X">
                                                {seat_status[11] == 1 ? (
                                                    <ImageToggle
                                                        key={11}
                                                        defaultSrc={seat}
                                                        hoverSrc={onhowerseat}
                                                        selectedSrc={onselectseat}
                                                        clsname="seat-11-UYV"
                                                    />
                                                )
                                                    : seat_status[11] == 2 ? (
                                                        <img alt="IMGGG"
                                                            className="seat-11-UYV"
                                                            src={onblockedseat}
                                                        />
                                                    )
                                                        : (
                                                            <img alt="IMGGG"

                                                                className="seat-11-UYV"
                                                                src={onbookedseat}
                                                            />
                                                        )}
                                                {/* <img alt="IMGGG" className="seat-11-UYV" src={seat} /> */}
                                                <div className="table-11-pMT"></div>
                                            </div>
                                        </div>
                                        <div className="auto-group-37vw-McH">
                                            <div className="group-12-ihj">
                                                {seat_status[12] == 1 ? (
                                                    <ImageToggle
                                                        key={12}
                                                        defaultSrc={seat}
                                                        hoverSrc={onhowerseat}
                                                        selectedSrc={onselectseat}
                                                        clsname="seat-12-FbB"
                                                    />
                                                )
                                                    : seat_status[12] == 2 ? (
                                                        <img alt="IMGGG"
                                                            className="seat-12-FbB"
                                                            src={onblockedseat}
                                                        />
                                                    )
                                                        : (
                                                            <img alt="IMGGG"
                                                                className="seat-12-FbB"
                                                                src={onbookedseat}
                                                            />
                                                        )}
                                                {/* <img alt="IMGGG" className="seat-12-FbB" src={seat} /> */}
                                                <div className="table-12-zYm"></div>
                                            </div>
                                            <img alt="IMGGG" className="group-165-ZLy" src={grass} />
                                        </div>
                                    </div>
                                </div>
                                <div className="auto-group-o17t-GmB">
                                    <img alt="IMGGG" className="group-163-1yf" src={grass} />
                                    {seat_status[37] == 1 ? (
                                        <ImageToggle
                                            key={37}
                                            defaultSrc={seat}
                                            hoverSrc={onhowerseat}
                                            selectedSrc={onselectseat}
                                            clsname="seat-37-M1w"
                                            style={{ rotate: "180deg" }}
                                        />
                                    )
                                        : seat_status[1] == 2 ? (
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-37-M1w"
                                                src={onblockedseat}
                                            />
                                        )
                                            : (
                                                <img alt="IMGGG"
                                                    style={{ rotate: "180deg" }}
                                                    className="seat-37-M1w"
                                                    src={onbookedseat}
                                                />
                                            )}
                                    {/* <img alt="IMGGG"
                  style={{ rotate: "180deg" }}
                  className="seat-37-M1w"
                  src={seat}
                /> */}
                                    {seat_status[36] == 1 ? (
                                        <ImageToggle
                                            key={36}
                                            defaultSrc={seat}
                                            hoverSrc={onhowerseat}
                                            selectedSrc={onselectseat}
                                            clsname="seat-36-HwB"
                                            style={{ rotate: "180deg" }}
                                        />
                                    )
                                        : seat_status[1] == 2 ? (
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-36-HwB"
                                                src={onblockedseat}
                                            />
                                        )
                                            : (
                                                <img alt="IMGGG"
                                                    style={{ rotate: "180deg" }}
                                                    className="seat-36-HwB"
                                                    src={onbookedseat}
                                                />
                                            )}
                                    <img alt="IMGGG"
                                        style={{ rotate: "180deg" }}
                                        className="seat-36-HwB"
                                        src={seat}
                                    />
                                    <img alt="IMGGG"
                                        style={{ rotate: "180deg" }}
                                        className="seat-35-E5j"
                                        src={seat}
                                    />
                                    <img alt="IMGGG"
                                        style={{ rotate: "180deg" }}
                                        className="seat-34-Nhj"
                                        src={seat}
                                    />
                                    <img alt="IMGGG"
                                        style={{ rotate: "180deg" }}
                                        className="seat-33-rso"
                                        src={seat}
                                    />
                                    <div className="group-168-QeR">
                                        <div className="auto-group-e6aq-JUu">
                                            <div className="group-27-Tch">
                                                <img alt="IMGGG" className="seat-27-pTF" src={seat} />
                                                <div className="table-27-9Ed"></div>
                                            </div>
                                            <div className="auto-group-mcum-VJV">
                                                <p className="pillar-cP7" />
                                            </div>
                                        </div>
                                        <div className="auto-group-cleq-YGm">
                                            <div className="auto-group-zvff-5nV">
                                                <div className="group-28-EvH">
                                                    <img alt="IMGGG" className="seat-28-Cs7" src={seat} />
                                                    <div className="table-28-Yvy"></div>
                                                </div>
                                                <div className="table-33-6Bo"></div>
                                            </div>
                                            <div className="auto-group-v2cu-rRs">
                                                <div className="group-29-RE5">
                                                    <img alt="IMGGG" className="seat-29-m33" src={seat} />
                                                    <div className="table-29-f8R"></div>
                                                </div>
                                                <div className="table-34-oVX"></div>
                                            </div>
                                            <div className="auto-group-c7vf-9pH">
                                                <div className="group-30-KCy">
                                                    <img alt="IMGGG" className="seat-30-5hw" src={seat} />
                                                    <div className="table-30-oP3"></div>
                                                </div>
                                                <div className="table-35-mKs"></div>
                                            </div>
                                            <div className="auto-group-xdyh-jGh">
                                                <div className="group-31-tfP">
                                                    <img alt="IMGGG" className="seat-31-dcy" src={seat} />
                                                    <div className="table-31-ZFj"></div>
                                                </div>
                                                <div className="table-36-72M"></div>
                                            </div>
                                            <div className="auto-group-yrlm-U7o">
                                                <div className="plant-7-MBb"></div>
                                                <img alt="IMGGG" className="vector-thK" src={vectorLkd} />
                                                <img alt="IMGGG" className="vector-DzV" src={vectortFw} />
                                                <img alt="IMGGG" className="vector-BAd" src={vectord73} />
                                                <img alt="IMGGG"
                                                    className="meteoconspollengrass0-L3X"
                                                    src={pollengrass}
                                                />
                                                <img alt="IMGGG" className="vector-RKs" src={vector2Ld} />
                                                <img alt="IMGGG" className="vector-aCm" src={vector1Ks} />
                                                <img alt="IMGGG" className="vector-WcD" src={vector1bT} />
                                                <img alt="IMGGG"
                                                    className="meteoconspollengrass0-4dj"
                                                    src={pollengrass} />
                                                <img alt="IMGGG" className="vector-zGV" src={vectorzAy} />
                                                <img alt="IMGGG" className="vector-iTP" src={vectorLiy} />
                                                <img alt="IMGGG" className="vector-4n9" src={vector} />
                                                <img alt="IMGGG"
                                                    className="meteoconspollengrass0-nCM"
                                                    src={pollengrass}
                                                />
                                                <img alt="IMGGG" className="vector-Ki5" src={vectorUqB} />
                                                <img alt="IMGGG" className="vector-rT7" src={vectorSjP} />
                                                <img alt="IMGGG" className="vector-ot9" src={vector97K} />
                                                <img alt="IMGGG"
                                                    className="meteoconspollengrass0-wjT"
                                                    src={pollengrass}
                                                />
                                                <img alt="IMGGG" className="vector-5qf" src={vectord9o} />
                                                <img alt="IMGGG" className="vector-31o" src={vectorqzu} />
                                                <img alt="IMGGG"
                                                    className="meteoconspollengrass0-YjF"
                                                    src={pollengrass}
                                                />
                                                <div className="table-37-6Vs"></div>
                                                <div className="group-32-S3w">
                                                    <img alt="IMGGG" className="seat-32-PUy" src={seat} />
                                                    <div className="table-32-7vm"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="group-170-sf3">
                                    <div className="auto-group-fbnv-yTB">
                                        <div className="group-38-jSM">
                                            <img alt="IMGGG" className="seat-38-g6h" src={seat} />
                                            <div className="table-38-18y"></div>
                                        </div>
                                        <div className="group-44-ZgH">
                                            <div className="table-44-LS9"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-44-UYM"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-psvd-dAM">
                                        <div className="group-39-ZZo">
                                            <img alt="IMGGG" className="seat-39-JXP" src={seat} />
                                            <div className="table-39-dZf"></div>
                                        </div>
                                        <div className="group-45-zv1">
                                            <div className="table-45-vYm"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-45-gnq"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-jytt-dxy">
                                        <div className="group-40-oMf">
                                            <img alt="IMGGG" className="seat-40-8uj" src={seat} />
                                            <div className="table-40-gAZ"></div>
                                        </div>
                                        <div className="group-46-RP3">
                                            <div className="table-46-Np5"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-46-949"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-5gms-GuT">
                                        <div className="group-41-DJu">
                                            <img alt="IMGGG" className="seat-41-yYy" src={seat} />
                                            <div className="table-41-WJ1"></div>
                                        </div>
                                        <div className="group-47-Gny">
                                            <div className="table-47-ShT"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-47-nmK"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-hz7f-weD">
                                        <div className="group-42-WBX">
                                            <img alt="IMGGG" className="seat-42-e2q" src={seat} />
                                            <div className="table-42-jpy"></div>
                                        </div>
                                        <div className="group-48-7BK">
                                            <div className="table-48-UnZ"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-48-F2d"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-4h25-CCm">
                                        <img alt="IMGGG" className="group-162-9th" src={grass} />
                                        <div className="group-49-sph">
                                            <div className="table-49-E9T"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-49-BqP"
                                                src={seat}
                                            />
                                        </div>
                                        <div className="group-43-LiH">
                                            <img alt="IMGGG" className="seat-43-UZb" src={seat} />
                                            <div className="table-43-kn1"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="group-171-J2q">
                                    <div className="auto-group-7uds-Rt9">
                                        <div className="group-50-Pa5">
                                            <img alt="IMGGG" className="seat-50-ZDf" src={seat} />
                                            <div className="table-50-HvM"></div>
                                        </div>
                                        <div className="group-56-1rM">
                                            <div className="table-56-kJ9"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-56-WHK"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-xeff-FVo">
                                        <div className="group-51-cLM">
                                            <img alt="IMGGG" className="seat-51-mj3" src={seat} />
                                            <div className="table-51-sXB"></div>
                                        </div>
                                        <div className="group-57-29B">
                                            <div className="table-57-bCH"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-57-Xrd"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-zhzd-Ums">
                                        <div className="group-52-QfX">
                                            <img alt="IMGGG" className="seat-52-LZB" src={seat} />
                                            <div className="table-52-Tdo"></div>
                                        </div>
                                        <div className="group-58-Rad">
                                            <div className="table-58-bV7"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-58-A2R"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-sclu-Hcq">
                                        <div className="group-53-rA9">
                                            <img alt="IMGGG" className="seat-53-Pfs" src={seat} />
                                            <div className="table-53-Y2y"></div>
                                        </div>
                                        <div className="group-59-hRf">
                                            <div className="table-59-Se9"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-59-Qay"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-evau-xcV">
                                        <div className="group-54-6ih">
                                            <img alt="IMGGG" className="seat-54-G7P" src={seat} />
                                            <div className="table-54-QjP"></div>
                                        </div>
                                        <div className="group-60-Nw7">
                                            <div className="table-60-L7F"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-60-VVw"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-upgh-Dgq">
                                        <img alt="IMGGG" className="group-161-FdX" src={grass} />
                                        <div className="group-61-PDw">
                                            <div className="table-61-79w"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-61-GHj"
                                                src={seat}
                                            />
                                        </div>
                                        <div className="group-55-yxq">
                                            <img alt="IMGGG" className="seat-55-jx1" src={seat} />
                                            <div className="table-55-VAV"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="auto-group-r5oj-pCm">
                                <div className="auto-group-mqk7-9kq">
                                    <div className="auto-group-pm3b-rfF">
                                        <div className="auto-group-zsc1-zWZ">THISTLE</div>
                                        <div className="auto-group-b2zh-1Am">IRIS</div>
                                        <div className="auto-group-hqm3-H8H">ORCHID</div>
                                    </div>
                                    <div className="auto-group-cvqb-Jp5">
                                        <div className="group-174-3mf">
                                            <div className="auto-group-rqhf-c45">
                                                <div className="rectangle-1-aFo"></div>
                                                <img alt="IMGGG"
                                                    style={{ rotate: "90deg" }}
                                                    className="seat-85-uYy"
                                                    src={seat}
                                                />
                                            </div>
                                            <div className="auto-group-tri9-SJ1">
                                                <div className="auto-group-kmro-Mvm">
                                                    <div className="rectangle-1-uBb"></div>
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "90deg" }}
                                                        className="seat-86-q5F"
                                                        src={seat}
                                                    />
                                                </div>
                                                <div className="auto-group-juy1-mzV" />
                                            </div>
                                        </div>
                                        <div className="group-177-4yb">
                                            <div className="auto-group-pbly-DrV">
                                                <div className="group-87-z6Z">
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "270deg" }}
                                                        className="seat-87-Ytm"
                                                        src={seat}
                                                    />
                                                    <div className="table-87-gzy"></div>
                                                </div>
                                                <div className="group-90-Sz9">
                                                    <div className="table-90-QAH"></div>
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "90deg" }}
                                                        className="seat-90-MbK"
                                                        src={seat}
                                                    />
                                                </div>
                                            </div>
                                            <div className="auto-group-ptqs-eKX">
                                                <div className="group-88-c1T">
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "270deg" }}
                                                        className="seat-88-mf3"
                                                        src={seat}
                                                    />
                                                    <div className="table-88-7iu"></div>
                                                </div>
                                                <div className="group-91-dx9">
                                                    <div className="table-91-1ZP"></div>
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "90deg" }}
                                                        className="seat-91-mYZ"
                                                        src={seat}
                                                    />
                                                </div>
                                            </div>
                                            <div className="auto-group-zato-VjT">
                                                <div className="group-89-SPo">
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "270deg" }}
                                                        className="seat-89-c3P"
                                                        src={seat}
                                                    />
                                                    <div className="table-89-v45"></div>
                                                </div>
                                                <div className="group-92-Gtd">
                                                    <div className="table-92-2N1"></div>
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "90deg" }}
                                                        className="seat-92-aeR"
                                                        src={seat}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group-176-hj3">
                                            <div className="auto-group-q78y-fA5">
                                                <div className="group-93-R9F">
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "270deg" }}
                                                        className="seat-93-AMj"
                                                        src={seat}
                                                    />
                                                    <div className="table-93-uaD"></div>
                                                </div>
                                                <div className="group-96-fJV">
                                                    <div className="table-96-S4M"></div>
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "90deg" }}
                                                        className="seat-96-bC9"
                                                        src={seat}
                                                    />
                                                </div>
                                            </div>
                                            <div className="auto-group-tbk3-jp9">
                                                <div className="group-94-Tk9">
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "270deg" }}
                                                        className="seat-94-EF7"
                                                        src={seat}
                                                    />
                                                    <div className="table-94-v7w"></div>
                                                </div>
                                                <div className="group-97-g77">
                                                    <div className="table-97-EPX"></div>
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "90deg" }}
                                                        className="seat-97-B3s"
                                                        src={seat}
                                                    />
                                                </div>
                                            </div>
                                            <div className="auto-group-qi8m-hnu">
                                                <div className="group-95-GLD">
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "270deg" }}
                                                        className="seat-95-Ryo"
                                                        src={seat}
                                                    />
                                                    <div className="table-95-aLu"></div>
                                                </div>
                                                <div className="group-98-X1F">
                                                    <div className="table-98-Hm7"></div>
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "90deg" }}
                                                        className="seat-98-CdB"
                                                        src={seat}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group-175-Yww">
                                            <div className="group-99-i5j">
                                                <img alt="IMGGG"
                                                    style={{ rotate: "270deg" }}
                                                    className="seat-99-5gy"
                                                    src={seat}
                                                />
                                                <div className="table-99-E45"></div>
                                            </div>
                                            <div className="group-100-Zs3">
                                                <img alt="IMGGG"
                                                    style={{ rotate: "270deg" }}
                                                    className="seat-100-tuK"
                                                    src={seat}
                                                />
                                                <div className="table-100-qpZ"></div>
                                            </div>
                                            <div className="group-101-boj">
                                                <img alt="IMGGG"
                                                    style={{ rotate: "270deg" }}
                                                    className="seat-101-miD"
                                                    src={seat}
                                                />
                                                <div className="table-101-JCM"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="auto-group-vvwd-SJZ">
                                        <div className="group-178-xGu">
                                            <div className="group-102-hVP">
                                                <div className="table-102-fh7"></div>
                                                <img alt="IMGGG"
                                                    style={{ rotate: "90deg" }}
                                                    className="seat-102-DyX"
                                                    src={seat}
                                                />
                                            </div>
                                            <div className="group-103-ANy">
                                                <div className="table-103-w8q"></div>
                                                <img alt="IMGGG"
                                                    style={{ rotate: "90deg" }}
                                                    className="seat-103-VRF"
                                                    src={seat}
                                                />
                                            </div>
                                            <div className="group-104-RJu">
                                                <div className="table-104-Njw"></div>
                                                <img alt="IMGGG"
                                                    style={{ rotate: "90deg" }}
                                                    className="seat-104-Xsj"
                                                    src={seat}
                                                />
                                            </div>
                                            <div className="group-105-Hc1">
                                                <div className="table-105-35P"></div>
                                                <img alt="IMGGG"
                                                    style={{ rotate: "90deg" }}
                                                    className="seat-105-bMo"
                                                    src={seat}
                                                />
                                            </div>
                                        </div>
                                        <div className="group-179-7L9">
                                            <div className="auto-group-herr-4FP">
                                                <div className="group-106-pVT">
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "270deg" }}
                                                        className="seat-106-Bau"
                                                        src={seat}
                                                    />
                                                    <div className="table-106-voP"></div>
                                                </div>
                                                <div className="group-110-gXf">
                                                    <div className="table-110-Cku"></div>
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "90deg" }}
                                                        className="seat-110-Z5f"
                                                        src={seat}
                                                    />
                                                </div>
                                            </div>
                                            <div className="auto-group-m9yp-5Zo">
                                                <div className="group-107-Dg1">
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "270deg" }}
                                                        className="seat-107-amT"
                                                        src={seat}
                                                    />
                                                    <div className="table-107-Kyw"></div>
                                                </div>
                                                <div className="group-111-fnu">
                                                    <div className="table-111-qhP"></div>
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "90deg" }}
                                                        className="seat-111-Pyo"
                                                        src={seat}
                                                    />
                                                </div>
                                            </div>
                                            <div className="auto-group-ks8h-x1K">
                                                <div className="group-108-Jqs">
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "270deg" }}
                                                        className="seat-108-UVT"
                                                        src={seat}
                                                    />
                                                    <div className="table-108-ba5"></div>
                                                </div>
                                                <div className="group-112-MZF">
                                                    <div className="table-112-8K7"></div>
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "90deg" }}
                                                        className="seat-112-f49"
                                                        src={seat}
                                                    />
                                                </div>
                                            </div>
                                            <div className="auto-group-qp73-9ED">
                                                <div className="group-109-uDP">
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "270deg" }}
                                                        className="seat-109-3qP"
                                                        src={seat}
                                                    />
                                                    <div className="table-109-o3s"></div>
                                                </div>
                                                <div className="group-113-XkZ">
                                                    <div className="table-113-hf3"></div>
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "90deg" }}
                                                        className="seat-113-4Eh"
                                                        src={seat}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group-180-QZT">
                                            <div className="auto-group-lwkb-jrd">
                                                <div className="auto-group-aukh-HdF">
                                                    <div className="group-114-E2h">
                                                        <img alt="IMGGG"
                                                            style={{ rotate: "270deg" }}
                                                            className="seat-114-zXf"
                                                            src={seat}
                                                        />
                                                        <div className="table-114-wSu"></div>
                                                    </div>
                                                    <div className="group-118-ecD">
                                                        <div className="table-118-pWh"></div>
                                                        <img alt="IMGGG"
                                                            style={{ rotate: "90deg" }}
                                                            className="seat-118-ZUH"
                                                            src={seat}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="auto-group-7bd7-7Eu">
                                                    <div className="group-115-5Bj">
                                                        <img alt="IMGGG"
                                                            style={{ rotate: "270deg" }}
                                                            className="seat-115-SY5"
                                                            src={seat}
                                                        />
                                                        <div className="table-115-xmK"></div>
                                                    </div>
                                                    <div className="group-119-vTF">
                                                        <div className="table-119-Txy"></div>
                                                        <img alt="IMGGG"
                                                            style={{ rotate: "90deg" }}
                                                            className="seat-119-ygR"
                                                            src={seat}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="auto-group-4isq-Hx1">
                                                <div className="group-116-E6Z">
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "270deg" }}
                                                        className="seat-116-bSu"
                                                        src={seat}
                                                    />
                                                    <div className="table-116-9DX"></div>
                                                </div>
                                                <div className="group-120-sQR">
                                                    <div className="table-120-SiR"></div>
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "90deg" }}
                                                        className="seat-120-zjw"
                                                        src={seat}
                                                    />
                                                </div>
                                            </div>
                                            <div className="auto-group-h2ir-9Mw">
                                                <div className="group-117-73s">
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "270deg" }}
                                                        className="seat-117-UQD"
                                                        src={seat}
                                                    />
                                                    <div className="table-117-B3j"></div>
                                                </div>
                                                <div className="group-121-8jf">
                                                    <div className="table-121-i3f"></div>
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "90deg" }}
                                                        className="seat-121-sBT"
                                                        src={seat}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group-181-zms">
                                            <div className="auto-group-qa6z-9em">
                                                <div className="group-122-gub">
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "270deg" }}
                                                        className="seat-122-DuX"
                                                        src={seat}
                                                    />
                                                    <div className="table-122-ZiV"></div>
                                                </div>
                                                <div className="group-126-vZ3">
                                                    <div className="table-126-sUH"></div>
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "90deg" }}
                                                        className="seat-126-cRs"
                                                        src={seat}
                                                    />
                                                </div>
                                            </div>
                                            <div className="auto-group-u5dx-7tR">
                                                <div className="group-123-t8V">
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "270deg" }}
                                                        className="seat-123-FUq"
                                                        src={seat}
                                                    />
                                                    <div className="table-123-Pqw"></div>
                                                </div>
                                                <div className="group-127-9q7">
                                                    <div className="table-127-j97"></div>
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "90deg" }}
                                                        className="seat-127-V8H"
                                                        src={seat}
                                                    />
                                                </div>
                                            </div>
                                            <div className="auto-group-ebnm-RGq">
                                                <div className="group-124-BWu">
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "270deg" }}
                                                        className="seat-124-Xqf"
                                                        src={seat}
                                                    />
                                                    <div className="table-124-sed"></div>
                                                </div>
                                                <div className="group-128-21j">
                                                    <div className="table-128-Pcy"></div>
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "90deg" }}
                                                        className="seat-128-jB3"
                                                        src={seat}
                                                    />
                                                </div>
                                            </div>
                                            <div className="auto-group-4vo3-t3w">
                                                <div className="group-125-qjs">
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "270deg" }}
                                                        className="seat-125-1PT"
                                                        src={seat}
                                                    />
                                                    <div className="table-125-wH7"></div>
                                                </div>
                                                <div className="group-129-uDw">
                                                    <div className="table-129-bsT"></div>
                                                    <img alt="IMGGG"
                                                        style={{ rotate: "90deg" }}
                                                        className="seat-129-9ty"
                                                        src={seat}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="group-182-HkH">
                                    <div className="rectangle-4-oTj"></div>
                                    <div className="auto-group-un3p-umf">
                                        <div className="group-130-pNq">
                                            <img alt="IMGGG"
                                                style={{ rotate: "270deg" }}
                                                className="seat-130-m3B"
                                                src={seat}
                                            />
                                            <div className="table-130-sc1"></div>
                                        </div>
                                        <div className="group-134-dLH">
                                            <div className="table-134-bY1"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "90deg" }}
                                                className="seat-134-XgZ"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-ufyh-gZT">
                                        <div className="group-131-RG9">
                                            <img alt="IMGGG"
                                                style={{ rotate: "270deg" }}
                                                className="seat-131-PCy"
                                                src={seat}
                                            />
                                            <div className="table-131-Xa5"></div>
                                        </div>
                                        <div className="group-135-TyX">
                                            <div className="table-135-dt1"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "90deg" }}
                                                className="seat-135-mzD"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-8a9t-5V7">
                                        <div className="group-132-qDP">
                                            <img alt="IMGGG"
                                                style={{ rotate: "270deg" }}
                                                className="seat-132-oAD"
                                                src={seat}
                                            />
                                            <div className="table-132-KeM"></div>
                                        </div>
                                        <div className="group-136-rPP">
                                            <div className="table-136-pb7"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "90deg" }}
                                                className="seat-136-NsX"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-25m7-ucZ">
                                        <div className="group-133-frd">
                                            <img alt="IMGGG"
                                                style={{ rotate: "270deg" }}
                                                className="seat-133-QpD"
                                                src={seat}
                                            />
                                            <div className="table-133-xKw"></div>
                                        </div>
                                        <div className="group-137-iK7">
                                            <div className="table-137-V4y"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "90deg" }}
                                                className="seat-137-bNu"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="auto-group-c8mb-XXT">
                            <div className="auto-group-7pwk-s5X">
                                <div className="group-172-q2M">
                                    <div className="auto-group-maah-NHB">
                                        <div className="group-62-vZb">
                                            <img alt="IMGGG" className="seat-62-3eD" src={seat} />
                                            <div className="table-62-AD3"></div>
                                        </div>
                                        <div className="group-68-Kbj">
                                            <div className="table-68-Txq"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-68-poP"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-kso7-Na1">
                                        <div className="group-63-upq">
                                            <img alt="IMGGG" className="seat-63-TbT" src={seat} />
                                            <div className="table-63-17B"></div>
                                        </div>
                                        <div className="group-69-Akm">
                                            <div className="table-69-9DP"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-69-HaV"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-mldb-22H">
                                        <div className="group-64-ZH7">
                                            <img alt="IMGGG" className="seat-64-85K" src={seat} />
                                            <div className="table-64-U9B"></div>
                                        </div>
                                        <div className="group-70-qEd">
                                            <div className="table-70-ohF"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-70-8zR"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-peu5-qtq">
                                        <div className="group-65-Bho">
                                            <img alt="IMGGG" className="seat-65-L4u" src={seat} />
                                            <div className="table-65-sad"></div>
                                        </div>
                                        <div className="group-71-SNq">
                                            <div className="table-71-nxV"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-71-LUD"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-395f-fmP">
                                        <div className="group-66-qA5">
                                            <img alt="IMGGG" className="seat-66-PxH" src={seat} />
                                            <div className="table-66-LsX"></div>
                                        </div>
                                        <div className="group-72-WX7">
                                            <div className="table-72-FDo"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-72-QcV"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-h3ad-ALm">
                                        <img alt="IMGGG" className="group-160-uZF" src={grass} />
                                        <div className="group-73-rDb">
                                            <div className="table-73-xnR"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-73-XKj"
                                                src={seat}
                                            />
                                        </div>
                                        <div className="group-67-H41">
                                            <img alt="IMGGG" className="seat-67-cc5" src={seat} />
                                            <div className="table-67-kyB"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="group-173-7oj">
                                    <div className="auto-group-sgpw-Mxy">
                                        <div className="auto-group-acdb-8D3">
                                            <p className="pillar-u7K" />
                                        </div>
                                        <div className="group-79-Dth">
                                            <div className="table-79-nwo"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-79-aMs"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-cxqz-u9F">
                                        <div className="group-74-e6q">
                                            <img alt="IMGGG" className="seat-74-yeu" src={seat} />
                                            <div className="table-74-Wuj"></div>
                                        </div>
                                        <div className="group-80-gZK">
                                            <div className="table-80-3uf"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-80-DJM"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-apbs-Y5j">
                                        <div className="group-75-J4u">
                                            <img alt="IMGGG" className="seat-75-445" src={seat} />
                                            <div className="table-75-oGZ"></div>
                                        </div>
                                        <div className="group-81-vMB">
                                            <div className="table-81-h73"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-81-SKX"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-ttpx-LQu">
                                        <div className="group-76-6ey">
                                            <img alt="IMGGG" className="seat-76-ru3" src={seat} />
                                            <div className="table-76-zEZ"></div>
                                        </div>
                                        <div className="group-82-ML1">
                                            <div className="table-82-hem"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-82-s3T"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-ubtr-nw7">
                                        <div className="group-77-8zy">
                                            <img alt="IMGGG" className="seat-77-JPf" src={seat} />
                                            <div className="table-77-F41"></div>
                                        </div>
                                        <div className="group-83-zXP">
                                            <div className="table-83-mHF"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-83-JY5"
                                                src={seat}
                                            />
                                        </div>
                                    </div>
                                    <div className="auto-group-ohwt-erq">
                                        <img alt="IMGGG" className="group-159-pFX" src={grass} />
                                        <div className="group-84-wb3">
                                            <div className="table-84-GdK"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "180deg" }}
                                                className="seat-84-S21"
                                                src={seat}
                                            />
                                        </div>
                                        <div className="group-78-atu">
                                            <img alt="IMGGG" className="seat-78-KLh" src={seat} />
                                            <div className="table-78-s7K"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="auto-group-wxem-oWm">
                                <div className="group-187-KV7">
                                    <div className="auto-group-kmim-28d">
                                        <div className="auto-group-nxt3-NiH">
                                            <img alt="IMGGG" className="mdi-stool-Xr5" src={sofa1} />
                                            <img alt="IMGGG"
                                                className="bitcoin-icons-sofa-filled-Tzd"
                                                src={sofa3}
                                            />
                                        </div>
                                        <img alt="IMGGG" className="mdi-stool-yTB" src={sofa2} />
                                    </div>
                                    <div className="auto-group-2s17-vNR" />
                                </div>
                                <div className="auto-group-amnm-CKw">
                                    <div className="group-138-V49">
                                        <img alt="IMGGG"
                                            style={{ rotate: "270deg" }}
                                            className="seat-138-Sk5"
                                            src={seat}
                                        />
                                        <div className="table-138-NNq"></div>
                                    </div>
                                    <div className="group-139-ixV">
                                        <img alt="IMGGG"
                                            style={{ rotate: "270deg" }}
                                            className="seat-139-Hkh"
                                            src={seat}
                                        />
                                        <div className="table-139-QqK"></div>
                                    </div>
                                    <div className="auto-group-uszh-aE1">
                                        <div className="plant-8-j6u"></div>
                                        <p className="pillar-THo" />
                                    </div>
                                </div>
                                <div className="auto-group-hkeh-xEZ">
                                    <div className="group-140-Exm">
                                        <div className="table-140-DAV"></div>
                                        <img alt="IMGGG"
                                            style={{ rotate: "90deg" }}
                                            className="seat-140-Lku"
                                            src={seat}
                                        />
                                    </div>
                                    <div className="group-141-HAM">
                                        <div className="table-141-T4q"></div>
                                        <img alt="IMGGG"
                                            style={{ rotate: "90deg" }}
                                            className="seat-141-PUH"
                                            src={seat}
                                        />
                                    </div>
                                    <div className="group-142-LuK">
                                        <div className="table-142-uxR"></div>
                                        <img alt="IMGGG"
                                            style={{ rotate: "90deg" }}
                                            className="seat-142-UEq"
                                            src={seat}
                                        />
                                    </div>
                                </div>
                                <div className="auto-group-7cmb-2GM">
                                    <div className="group-143-A7f">
                                        <img alt="IMGGG"
                                            style={{ rotate: "270deg" }}
                                            className="seat-143-htH"
                                            src={seat}
                                        />
                                        <div className="table-143-rFP"></div>
                                    </div>
                                    <div className="group-144-xJR">
                                        <img alt="IMGGG"
                                            style={{ rotate: "270deg" }}
                                            className="seat-144-hWu"
                                            src={seat}
                                        />
                                        <div className="table-144-qt1"></div>
                                    </div>
                                    <div className="group-145-QAR">
                                        <img alt="IMGGG"
                                            style={{ rotate: "270deg" }}
                                            className="seat-145-Z3K"
                                            src={seat}
                                        />
                                        <div className="table-145-Ug5"></div>
                                    </div>
                                </div>
                                <div className="auto-group-3thx-S77">
                                    <div className="group-146-NWZ">
                                        <div className="table-146-YR3"></div>
                                        <img alt="IMGGG"
                                            style={{ rotate: "90deg" }}
                                            className="seat-146-6hT"
                                            src={seat}
                                        />
                                    </div>
                                    <div className="group-147-EHs">
                                        <div className="table-147-CVb"></div>
                                        <img alt="IMGGG"
                                            style={{ rotate: "90deg" }}
                                            className="seat-147-Xnm"
                                            src={seat}
                                        />
                                    </div>
                                    <div className="group-148-HG9">
                                        <div className="table-148-q2m"></div>
                                        <img alt="IMGGG"
                                            style={{ rotate: "90deg" }}
                                            className="seat-148-b1w"
                                            src={seat}
                                        />
                                    </div>
                                </div>
                                <div className="auto-group-bj3f-Kid">
                                    <div className="group-183-UbX">
                                        <div className="auto-group-6p4h-oth">
                                            <div className="group-154-AjF">
                                                <img alt="IMGGG"
                                                    style={{ rotate: "270deg" }}
                                                    className="seat-154-jXT"
                                                    src={seat}
                                                />
                                                <div className="table-154-FVo"></div>
                                            </div>
                                            <div className="group-156-p37">
                                                <div className="table-156-95P"></div>
                                                <img alt="IMGGG"
                                                    style={{ rotate: "90deg" }}
                                                    className="seat-156-VQ9"
                                                    src={seat}
                                                />
                                            </div>
                                        </div>
                                        <div className="group-157-qiu">
                                            <div className="table-157-zrh"></div>
                                            <img alt="IMGGG"
                                                style={{ rotate: "90deg" }}
                                                className="seat-157-Y7X"
                                                src={seat}
                                            />
                                        </div>
                                        <div className="auto-group-yhqy-Hau">
                                            <div className="group-155-EW9">
                                                <img alt="IMGGG"
                                                    style={{ rotate: "270deg" }}
                                                    className="seat-155-CSy"
                                                    src={seat}
                                                />
                                                <div className="table-155-iw7"></div>
                                            </div>
                                            <div className="group-158-HUR">
                                                <div className="table-158-TNu"></div>
                                                <img alt="IMGGG"
                                                    style={{ rotate: "90deg" }}
                                                    className="seat-158-nRB"
                                                    src={seat}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="group-184-sSd">
                                        <div className="auto-group-xba5-or5">
                                            <div className="group-149-xDB">
                                                <img alt="IMGGG"
                                                    style={{ rotate: "270deg" }}
                                                    className="seat-149-KpR"
                                                    src={seat}
                                                />
                                                <div className="table-149-UBX"></div>
                                            </div>
                                            <div className="group-150-Qay">
                                                <img alt="IMGGG"
                                                    style={{ rotate: "270deg" }}
                                                    className="seat-150-LUd"
                                                    src={seat}
                                                />
                                                <div className="table-150-Uqj"></div>
                                            </div>
                                            <div className="group-151-SGm">
                                                <img alt="IMGGG"
                                                    style={{ rotate: "270deg" }}
                                                    className="seat-151-D2d"
                                                    src={seat}
                                                />
                                                <div className="table-151-9ws"></div>
                                            </div>
                                        </div>
                                        <div className="auto-group-ghc1-ggu">
                                            <div className="pillar-6-Dwj"></div>
                                            <div className="group-153-miM">
                                                <div className="table-153-idb"></div>
                                                <img alt="IMGGG"
                                                    style={{ rotate: "90deg" }}
                                                    className="seat-153-T5P"
                                                    src={seat}
                                                />
                                            </div>
                                            <div className="group-152-Cof">
                                                <div className="table-152-MwT"></div>
                                                <img alt="IMGGG"
                                                    style={{ rotate: "90deg" }}
                                                    className="seat-152-J61"
                                                    src={seat}
                                                />
                                            </div>
                                            <p className="pillar-ccV" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="auto-group-h389-Kmo">NOC ROOM</div>
                        <div className="auto-group-7svj-QYM">
                            <div className="auto-group-3zvz-MCh">
                                <img alt="IMGGG" className="armchair-3-1-fUH" src={onhowerseat} />
                                <p className="on-hover-Qgm">On hover</p>
                                <img alt="IMGGG" className="armchair-7-1-trq" src={onblockedseat} />
                                <p className="blocked-by-admin-for-maintenance-global-visitors-SdT">
                                    blocked by admin for ( maintenance / global visitors)
                                </p>
                                <img alt="IMGGG" className="armchair-5-2-ZCH" src={onselectseat} />
                            </div>
                            <img alt="IMGGG" className="armchair-5-3-6xu" src={onselectseat} />
                        </div>
                        <div className="auto-group-ab5o-4Pw">
                            <img alt="IMGGG" className="armchair-5-1-XoK" src={onselectseat} />
                            <p className="on-select-ggD">On select</p>
                            <img alt="IMGGG" className="armchair-6-1-PqX" src={onbookedseat} />
                            <p className="on-booked-XB3">On booked</p>
                            <img alt="IMGGG" className="armchair-7-2-SYu" src={onblockedseat} />
                            <img alt="IMGGG" className="armchair-7-3-xn9" src={onblockedseat} />
                            <img alt="IMGGG" className="armchair-6-2-gTF" src={onbookedseat} />
                            <img alt="IMGGG" className="armchair-6-3-dNV" src={onbookedseat} />
                            <img alt="IMGGG" className="armchair-3-2-mjb" src={onhowerseat} />
                            <img alt="IMGGG" className="armchair-3-3-v6h" src={onhowerseat} />
                        </div>
                    </div>
                </div>
            )}
        </>

    );
}

export default SeatLayout;