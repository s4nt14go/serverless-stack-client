import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function LoadingComponent(props) {
  if (props.error) {
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.pastDelay) {
    return <div style={{textAlign: 'center', padding: '60px 0'}}>
      <ClipLoader
        size={150}
        color={"#cccccc"}
        loading={true}
      />
    </div>;
  } else return null;
}
