import React, { useEffect, useRef, useState } from 'react';
import { FeedBackIcon } from '../../icons/FeedBackIcon';
import { Modal } from '../Modal/Modal';

interface IProps {
  className?: string;
  fill?: string;
  viewBox?: string;
  stroke?: string;
  strokeWidth?: number;
  width?: number;
  height?: number;
  alignment?: string;
  backgroundColor?: string
}
/*
 * @params width  => icon width
 * @params height => icon height
 * @params icon   => svg icon
 * @params alignment => bottom-right or bottom-left or top-left or top-right
 */

//style
const feedBackStickyStyle: any = () => ({
  position: 'fixed',
});
//style 
const feedBackStyle: any = () => ({
  padding: 0,
  margin: 0,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 'none',
});
export const FeedBacky: React.FC<IProps> = ({
  width = 32,
  height = 32,
  className,
  fill,
  viewBox,
  stroke,
  strokeWidth,
  alignment = 'bottom-right',
  backgroundColor,
}) => {
  // default modal state
  const [openModal, setOpenModal] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref?.current) {
      if (alignment === 'bottom-right') {
        ref.current.style.bottom = '0';
        ref.current.style.right = '0';
      } else if (alignment === 'bottom-left') {
        ref.current.style.bottom = '0';
        ref.current.style.left = '0';
      } else if (alignment === 'top-right') {
        ref.current.style.top = '0';
        ref.current.style.right = '0';
      } else if (alignment === 'top-left') {
        ref.current.style.top = '0';
        ref.current.style.left = '0';
      }
    }
  }, [alignment]);
  return (
    <>
      <div ref={ref} className="feedback-sticky" style={feedBackStickyStyle()}>
        <button
          data-test="feedBackComponent"
          style={feedBackStyle()}
          onClick={() => setOpenModal(true)}
        >
          <FeedBackIcon
            className={className}
            width={width}
            height={height}
            fill={fill}
            viewBox={viewBox}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        </button>
      </div>
      {openModal && <Modal closeModal={setOpenModal}  backgroundColor={backgroundColor}/>}
    </>
  );
};
