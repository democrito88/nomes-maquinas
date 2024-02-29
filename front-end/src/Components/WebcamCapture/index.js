import React from "react";
import Webcam from "react-webcam";

const WebcamCapture = () => {
  //const [deviceId, setDeviceId] = React.useState({});
  const videoConstraints = {
    width: { min: 480 },
    height: { min: 720 },
    aspectRatio: 0.6666666667
  };
  
  const [devices, setDevices] = React.useState([]);

  const handleDevices = React.useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  React.useEffect(
    () => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    },
    [handleDevices]
  );

  return (
    <>
      {devices.map((device, key) => (
        <div>
          <Webcam audio={false} videoConstraints={{ deviceId: device.deviceId }} />
          {device.label || `Device ${key + 1}`}
        </div>

      ))}
      <Webcam
        videoConstraints={videoConstraints}
        width={480}
        height={720}
      />
    </>
  );
};

export default WebcamCapture;