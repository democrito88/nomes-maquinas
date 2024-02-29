import {QrScanner} from '@yudiel/react-qr-scanner';
 
const Scanner = () => {
  return (
      <QrScanner
          onDecode={(result) => console.log(result)}
          onError={(error) => console.log(error?.message)}
          constraints={{
            audio: true,
            video: { facingMode: "environment" }
          }}
            
      />
  );
}

export default Scanner;