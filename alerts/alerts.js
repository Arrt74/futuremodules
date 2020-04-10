import "./alert.css";
import React, {Fragment, useEffect, useRef, useState} from "react";
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal";
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
  const buttonConfirm = useRef(null);

  useEffect(() => {
    if (buttonConfirm.current) {
      buttonConfirm.current.focus();
      buttonConfirm.current.select();
    }
  }, []);

  if (confirmAlertWithWriteCheck) {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show
      >
        {confirmAlertWithWriteCheck.title && <Modal.Header>
          <Modal.Title><b>{confirmAlertWithWriteCheck.title}</b></Modal.Title>
        </Modal.Header>}
        <Modal.Body>
          <div>
            To delete <b>{confirmAlertWithWriteCheck.text}</b> type it below to <b>confirm</b> it.<br/><br/>
            <b>Warning</b>: once it's gone... It's gone!
          </div>
          <InputGroup className="my-3">
            <FormControl
              onChange={(e) => {
                const isSame = e.target.value === confirmAlertWithWriteCheck.text;
                if (modalConfirmWithWriteDeleteButtonEnabled !== isSame) {
                  setModalConfirmWithWriteDeleteButtonEnabled(isSame);
                }
              }}
            />
          </InputGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {
            setModalConfirmWithWriteDeleteButtonEnabled(false);
            setConfirmAlertWithWriteCheck(null);
          }}>
            {confirmAlertWithWriteCheck.noText}
          </Button>
          <Button
            ref={buttonConfirm}
            disabled={!modalConfirmWithWriteDeleteButtonEnabled}
            variant={confirmAlertWithWriteCheck.yesType}
            onClick={() => {
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
          <Button ref={buttonConfirm}
                  variant="primary" onClick={() => setConfirmAlert(null)}>
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
    return (
      <Modal
        size="lg"
        className={notificationAlert.alertType}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onClose={() => {
          setNotificationAlert(null).then();
        }}>
        <Modal.Body>
          <h3>{notificationAlert.title}</h3>
          <br/>
          <b>{notificationAlert.text}</b>
          <div className="mt-3">
            <Button ref={buttonConfirm}
                    variant="info" onClick={() => setNotificationAlert(null)}>
              Alright...
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  return <Fragment/>
};

export const useAlert = () => {
  const [, store] = useGlobal(NotificationAlert);
  return store;
};

export const useConfirmAlertWithWriteCheck = () => {
  const [, store] = useGlobal(ConfirmAlertWithWriteCheck);
  return store;
};

export const useConfirmAlertWithWriteCheckShort = () => {
  const [, store] = useGlobal(ConfirmAlertWithWriteCheck);

  const updater = (elem, callback) => store(
    {
      title: "Deletion of " + elem,
      text: elem,
      noText: "No, I've changed my mind",
      yesText: "Yes, do it",
      yesType: "danger",
      yesCallback: async () => callback()
    }
  );

  return updater;
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
