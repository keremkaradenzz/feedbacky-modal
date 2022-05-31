import React, { useState } from 'react';
import './styles.css';
import axios from 'axios';

interface IProps {
  closeModal: (a: boolean) => void;
}

interface IData {
  domain: string;
  feedback: string;
}
/*
 * @params closeModal  => modal open function
 */
export const Modal: React.FC<IProps> = ({ closeModal }) => {
  const [value, setValue] = useState<string>('');
  const [sendControl, setSendControl] = useState<boolean>(false);
  //sending textarea value  backend
  const handleSend = async () => {
    const data: IData = {
      domain: window.location.hostname,
      feedback: value,
    };

    try {
      const res = await axios.post(
        'https://feedbacky-be.herokuapp.com/feedback/',
        data
      );
      if (res) {
        setSendControl(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            data-testid="closeIcon"
            onClick={() => {
              closeModal(false);
            }}
          >
            X
          </button>
        </div>
        {!sendControl ? (
          <>
            <div className="title">
              <h1>Send Your FeedBack</h1>
            </div>
            <div className="body">
              <textarea
                aria-label="textarea-input"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
              {value?.length >= 2000 ? (
                <small data-testid="error-text">
                  2000 karakterden fazla olamaz!
                </small>
              ) : null}
            </div>
            <div className="footer">
              <button
                disabled={value?.length >= 2000}
                onClick={handleSend}
                className="toggle-button"
                data-testid="sendButton"
                aria-label="send-button"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="success-feedback">
            <h1 data-testid="successFeedback">WE HAVE GOT YOUR FEEDBACK</h1>
          </div>
        )}
      </div>
    </div>
  );
};
