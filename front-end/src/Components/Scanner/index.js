import {QrScanner} from 'react-qr-scanner';

const Scanner = () => {
  return (
      <QrScanner
          onDecode={() => console.log()}
          onError={() => console.log()}
      />
  );
}

export default Scanner;