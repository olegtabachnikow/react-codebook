import { FC, ReactNode, useEffect, useState } from 'react';
import './Resizable.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface Props {
  direction: 'horizontal' | 'vertical';
  children: ReactNode;
}

const Resizable: FC<Props> = ({ direction, children }) => {
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);
  const [width, setWidth] = useState<number>(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  const resizableProps: ResizableBoxProps =
    direction === 'vertical'
      ? {
          width: Infinity,
          height: 300,
          resizeHandles: ['s'],
          maxConstraints: [Infinity, innerHeight * 0.9],
          minConstraints: [Infinity, 24],
        }
      : {
          className: 'resize-horizontal',
          width: width,
          height: Infinity,
          resizeHandles: ['e'],
          maxConstraints: [innerWidth * 0.75, Infinity],
          minConstraints: [innerWidth * 0.2, Infinity],
          // @ts-expect-error event not read
          onResizeStop: (event, data) => {
            setWidth(data.size.width);
          },
        };

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
