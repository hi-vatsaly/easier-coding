import React, { Fragment, useState, useEffect } from "react";
import { Modal, Card, Button, Image } from "react-bootstrap";
import TopNav from "./TopNav";
import MakeAPICall from "../util/common";
import moment from "moment";
import PlaneImg from "../assets/images/plane-img.png";

export default function FlightList() {
  // api call params
  const [apiCallParam, setApiCallParam] = useState(null);

  // flight data will be store here
  const [flightData, setFlightData] = useState([]);

  // current selected flight data
  const [selectedFlight, setSelectedFlight] = useState({
    departure_airport: '',
    departure_city: '',
    arrival_airport: '',
    flight_number: ''
  });

  // to toggle the flight detail model
  const [show, setShow] = useState(false);

  const toggleModal = () => {
    setShow(!show);
  };

  // get the data from api call
  const getFlightData = () => {
    let apiParam = {
      reqType: "GET",
      reqURL: "/data.json",
      dataObj: {},
      params: {},
      headers: {},
      successCallback: (res) => {
        console.log("Got the res: ", res);
        setFlightData(res);
      },
      failureCallback: (err) => {
        console.log("Something went wrong, ", err);
      },
    };
    setApiCallParam(apiParam);
  };

  // selected flight will be here
  const openFlightDetail = (flightData) => {
    setSelectedFlight(flightData);
    toggleModal();
  };

  // once page rendered
  useEffect(() => {
    getFlightData();
  }, []);

  return (
    <Fragment>
      <TopNav />
      <div className="container mt-2 fixed-container mb-4">
        <div className="row">
          {flightData.map((flight, index) => {
            return (
              <div
                className="col-sm-12 mt-2"
                key={index}
              >
                <Card>
                  <Card.Title className="p-3 border-bottom">
                    <p className="w-75 font-14 float-left">Flight to, {flight.arrival_city}</p>
                    <Button variant="primary float-right" onClick={() => openFlightDetail(flight)}>View</Button>
                  </Card.Title>
                  <Card.Body>
                    <div className="d-flex">
                      <div className="col text-center">
                        <p className="mb-0 pb-0 text-grey font-14">
                          {flight.departure_airport}
                        </p>
                        <p className="mb-0 pb-0 text-blue font-15 font-weight-bold">
                          {moment(flight.departure_date).format("HH:MM")}
                        </p>
                        <p className="mb-0 pb-0 text-grey font-14">
                          {flight.departure_city}
                        </p>
                      </div>
                      <div className="col position-relative pl-0 pr-0">
                        <div className="w-100 font-14 text-center text-grey">
                          {flight.scheduled_duration}
                        </div>
                        <div className="w-100 p-1 dotted-line"></div>
                      </div>
                      <div className="col text-center">
                        <p className="mb-0 pb-0 text-grey font-14">
                          {flight.arrival_airport}
                        </p>
                        <p className="mb-0 pb-0 text-blue font-15 font-weight-bold">
                          {moment(flight.arrival_date).format("HH:MM")}
                        </p>
                        <p className="mb-0 pb-0 text-grey font-14">
                          {flight.arrival_city}
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
        <Modal show={show} onHide={toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Flight Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card className="bg-blue p-0 m-0 text-white">
              <Card.Body>
                <div className="row p-0 m-0 text-center">
                  <div className="col-sm-5 mt-2">
                    <p className="text-white font-20 font-weight-bold mb-0">{selectedFlight.departure_airport}</p>
                    <p className="text-white font-14">{selectedFlight.departure_city}</p>
                  </div>
                  <div className="col-sm-2 mt-2">
                      <Image src={PlaneImg} className="plane-img"/>
                  </div>
                  <div className="col-sm-5 mt-2">
                  <p className="text-white font-20 font-weight-bold mb-0">{selectedFlight.arrival_airport}</p>
                    <p className="text-white font-14">{selectedFlight.arrival_city}</p>
                  </div>
                </div>
                <div className="row m-0 p-0 mt-4">
                  <div className="col-sm-4">
                      <span>Flight:</span> <span className="font-weight-bold ml-2">{selectedFlight.flight_number}</span>
                  </div>
                  <div className="col-sm-4 offset-sm-4">
                      <span>Gate:</span> <span className="font-weight-bold ml-2">- -</span>
                  </div>
                  <div className="col-sm-4 mt-2">
                      <span>Terminal:</span> <span className="font-weight-bold ml-2">- -</span>
                  </div>
                  <div className="col-sm-4 offset-sm-4 mt-2">
                      <span>Seat:</span> <span className="font-weight-bold ml-2">- -</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Modal.Body>
        </Modal>
      </div>
      <MakeAPICall apiParam={apiCallParam} />
    </Fragment>
  );
}
