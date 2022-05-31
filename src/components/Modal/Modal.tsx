import React, { useState } from 'react';
import axios from 'axios';

const modalBackgroundStyle: any = () => ({
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  inset: '40%'
});

const modalContainerStyle: any = () => ({
  width: '350px',
  height: '250px',
  borderRadius: '12px',
  backgroundColor: 'white',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  display: 'flex',
  flexDirection: 'column',
  padding: '15px',
});

const closeButton: any = () => ({
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '25px',
  cursor: 'pointer',
});

const bodyStyle: any = () => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.7rem',
  textAlign: 'center',
});

const textAreaStyle: any = () => ({
  width: '95%',
  minHeight: '50px',
  padding: '10px',
  resize: 'none',
  boxSizing: 'border-box',
  border: '2px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#f8f8f8',
});

const footerButtonStyle: any = () => ({
  minWidth: '250px',
  minHeight: '45px',
  margin: '10px',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '20px',
  backgroundColor: 'rgb(228, 147, 41)',
});

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
    <div style={modalBackgroundStyle()}>
      <div style={modalContainerStyle()}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            style={closeButton()}
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
            <div
              className="title"
              style={{
                display: 'inline-block',
                textAlign: 'center',
                fontSize: '12px',
                textTransform: 'uppercase',
                marginTop:2
              }}
            >
              <h1>Send Your FeedBack</h1>
            </div>
            <div style={bodyStyle()}>
              <textarea
                style={textAreaStyle()}
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
            <div
              className="footer"
              style={{
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <button
                disabled={value?.length >= 2000}
                onClick={handleSend}
                style={footerButtonStyle()}
                data-testid="sendButton"
                aria-label="send-button"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div style={{ marginTop: 30, textAlign: 'center' }}>
            <h1
              style={{ color: 'rgb(13, 101, 13)' }}
              data-testid="successFeedback"
            >
              WE HAVE GOT YOUR FEEDBACK
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};
