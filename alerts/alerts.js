import "./alert.css";
import React, {Fragment, useEffect, useRef, useState} from "react";
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal";
import {getRandomMovieQuote, getRandomMovieQuotePositive} from "../warningsmoviequotes/warningMovieQuotes";
import {useGlobal} from "reactn";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export const ConfirmAlert = 'confirmAlert';
export const MultiChoiceAlert = 'multiChoiceAlert';
export const NotificationAlert = 'notificationAlert';
export const ConfirmAlertWithWriteCheck = 'ConfirmAlertWithWriteCheck';

export const EHAlert = () => {

  const [confirmAlert, setConfirmAlert] = useGlobal(ConfirmAlert);
  const [multiChoiceAlert, setMultiChoiceAlert] = useGlobal(MultiChoiceAlert);
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
        onHide={() => {
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
          <Button variant={confirmAlert.yesType} onClick={() => {
              confirmAlert.yesCallback().then();
              setConfirmAlert(null).then();
            }
          }>
            {confirmAlert.yesText}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  if (multiChoiceAlert) {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onHide={() => {
          setMultiChoiceAlert(null).then();
        }}>
        {multiChoiceAlert.title && <Modal.Header closeButton>
          <Modal.Title>{multiChoiceAlert.title}</Modal.Title>
        </Modal.Header>}
        <Modal.Body>{multiChoiceAlert.text}</Modal.Body>
        <Modal.Footer>
          {multiChoiceAlert.buttons.map( elem => {
            return (
              <Button variant="primary"
                      onClick={() => {
                        multiChoiceAlert.yesCallback(elem).then();
                        setConfirmAlert(null).then();
                      }}>
                {elem}
              </Button>
            )
          })}
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
        onHide={() => {
          notificationAlert.closeCallback && notificationAlert.closeCallback();
          setNotificationAlert(null).then();
        }}>
        <Modal.Body>
          <h3>{notificationAlert.title}</h3>
          <br/>
          <b>{notificationAlert.text}</b>
          <div className="mt-3">
            <Button ref={buttonConfirm}
                    variant="info" onClick={() => {
              notificationAlert.closeCallback && notificationAlert.closeCallback();
              setNotificationAlert(null).then()
            }}>
              OKEY
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  return <Fragment/>
};

export const useAlertWarning = () => {
  const [, store] = useGlobal(NotificationAlert);

  const updater = (message) => {
    alertWarning(store, message);
  };

  return updater;
};

export const useAlertSuccess = () => {
  const [, store] = useGlobal(NotificationAlert);

  const updater = (message, closeCallback) => {
    alertSuccess(store, message, closeCallback);
  };

  return updater;
};

export const useAlert = () => {
  const [, store] = useGlobal(NotificationAlert);
  return store;
};

export const useConfirmAlert = () => {
  const [, store] = useGlobal(ConfirmAlert);

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

export const useMultiChoiceAlert = () => {
  const [, store] = useGlobal(MultiChoiceAlert);

  const updater = (title, text, buttons, callback) => store(
    {
      title,
      text,
      buttons,
      yesCallback: async (button) => callback(button)
    }
  );

  return updater;
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

export const alertSuccess = (store, title, closeCallback) => {
  store({
    title: title,
    text: getRandomMovieQuotePositive(),
    alertType: "success",
    closeCallback: closeCallback
  }).then();

};
