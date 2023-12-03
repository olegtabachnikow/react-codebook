import { FC, useEffect, useRef } from 'react';
import './Preview.css';

interface Props {
  code: string;
  bundleErr: string;
}

const html = `
  <html>
    <head>
    <style>html {background-color: white} </style>
    </head>
    <body>
      <div id="root"></div>
      <script>
      const root = document.querySelector('#root');
      const handleError = (err) => {
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
      }
      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      });
      window.addEventListener('message', (event) => {
        try {
          if(!root) {
            root.innerHTML = '';
          }
          eval(event.data);
        } catch (err) {
          handleError(err);
        }
      },false)
      </script>
    </body>
  </html>
`;

const Preview: FC<Props> = ({ code, bundleErr }) => {
  const iframeRef = useRef<any>(null);
  useEffect(() => {
    iframeRef.current.srcDoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className='preview-wrapper'>
      <iframe
        ref={iframeRef}
        srcDoc={html}
        title='preview'
        sandbox='allow-scripts'
      />
      {!!bundleErr.length && <div className='preview-error'>{bundleErr}</div>}
    </div>
  );
};

export default Preview;
