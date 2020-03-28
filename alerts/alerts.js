import React, {Fragment, useState} from "react";
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import {getRandomMovieQuote, getRandomMovieQuotePositive} from "../warningsmoviequotes/warningMovieQuotes";
import {useGlobal} from "reactn";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export const ConfirmAlert = 'confirmAlert';
export const NotificationAlert = 'notificationAlert';
export const ConfirmAlertWithWriteCheck = 'ConfirmAlertWithWriteCheck';

export const EHAlert = () => {

  const [confirmAlert, setConfirmAlert] = useGlobal(ConfirmAlert);
  const [confirmAlertWithWriteCheck, setConfirmAlertWithWriteCheck] = useGlobal(ConfirmAlertWithWriteCheck);
  const [notificationAlert, setNotificationAlert] = useGlobal(NotificationAlert);
  const [modalConfirmWithWriteDeleteButtonEnabled, setModalConfirmWithWriteDeleteButtonEnabled] = useState(false);

  if (confirmAlertWithWriteCheck) {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onClose={() => {
          setConfirmAlertWithWriteCheck(null).then();
          setModalConfirmWithWriteDeleteButtonEnabled(false);
        }}
      >
        {confirmAlertWithWriteCheck.title && <Modal.Header closeButton onClick={ () => {
          setModalConfirmWithWriteDeleteButtonEnabled(false);
          setConfirmAlertWithWriteCheck(null);
        }}>
          <Modal.Title>{confirmAlertWithWriteCheck.title}</Modal.Title>
        </Modal.Header>}
        <Modal.Body>
          <div>
          To delete <b>{confirmAlertWithWriteCheck.text}</b> type it below to <b>confirm</b> it.<br/><br/>
            <b>Warning</b>: once it's gone... It's gone!
          </div>
          <InputGroup className="my-3">
            <FormControl
              onChange={ (e) => {
                const isSame = e.target.value === confirmAlertWithWriteCheck.text;
                if ( modalConfirmWithWriteDeleteButtonEnabled !== isSame ) {
                  setModalConfirmWithWriteDeleteButtonEnabled(isSame);
                }
              } }
            />
          </InputGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={ () => {
            setModalConfirmWithWriteDeleteButtonEnabled(false);
            setConfirmAlertWithWriteCheck(null);
          }}>
            {confirmAlertWithWriteCheck.noText}
          </Button>
          <Button
            disabled={!modalConfirmWithWriteDeleteButtonEnabled}
            variant={confirmAlertWithWriteCheck.yesType}
            onClick={ () => {
              confirmAlertWithWriteCheck.yesCallback();
              setConfirmAlertWithWriteCheck(null).then();
              setModalConfirmWithWriteDeleteButtonEnabled(false);
            }}>
            {confirmAlertWithWriteCheck.yesText}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  if (confirmAlert) {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onClose={() => {
          setConfirmAlert(null).then();
        }}>
        {confirmAlert.title && <Modal.Header closeButton>
          <Modal.Title>{confirmAlert.title}</Modal.Title>
        </Modal.Header>}
        <Modal.Body>{confirmAlert.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={ () => setConfirmAlert(null)}>
            {confirmAlert.noText}
          </Button>
          <Button variant={confirmAlert.yesType} onClick={confirmAlert.yesCallback}>
            {confirmAlert.yesText}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  if (notificationAlert) {
    const centered = {
      position: 'absolute',
      top: "50%",
      left: "50%",
      // marginTop: "-50px",
      marginLeft: "-45%",
      width: "90%",
    }
    const outlineVariant = "outline-secondary";
    return (
      <div style={centered}>
        <Alert key={notificationAlert.title} variant={notificationAlert.alertType}
               onClose={() => {
                 setNotificationAlert(null).then();
               }} dismissible>
          {notificationAlert.title && <Alert.Heading>{notificationAlert.title}</Alert.Heading>}
          {notificationAlert.text}
          <div className="d-flex justify-content-end">
            <Button onClick={() => setNotificationAlert(null).then()} variant={outlineVariant}>
              Alright...
            </Button>
          </div>
        </Alert>
      </div>
    )
  }

  return <Fragment/>
};

export const useAlert = () => {
  const [, store] = useGlobal(NotificationAlert);
  return store;
};

export const useAlertWarning = (title) => {

  const [, store] = useGlobal(NotificationAlert);

  store({
    title: title,
    text: getRandomMovieQuote(),
    alertType: "warning"
  }).then();

};

export const alertWarning = (store, title) => {

  store({
    title: title,
    text: getRandomMovieQuote(),
    alertType: "warning"
  }).then();

};

export const alertDangerNoMovie = (store, title) => {

  store({
    title: title,
    text: "",
    alertType: "danger"
  }).then();

};

export const alertSuccess = (store, title) => {
  store({
    title: title,
    text: getRandomMovieQuotePositive(),
    alertType: "success"
  }).then();

};
