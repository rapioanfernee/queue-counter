"use-client";
import React from "react";

const InitializeValuesForm = (props: {
  processingTimes: number[];
  queue: number;
  updateInitialState: (processingTimes: number[], queue: number) => void;
}) => {
  const processingTimes = props.processingTimes;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    const processingTimes = [
      Number(formObject.counter0),
      Number(formObject.counter1),
      Number(formObject.counter2),
      Number(formObject.counter3),
    ];
    props.updateInitialState(processingTimes, Number(formObject.client));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>Initialize values</div>
      {processingTimes.map((processingTime, index) => (
        <div key={`${index}-${processingTime}`}>
          <span>Counter {index} Processing Time</span>{" "}
          <input
            type="text"
            name={`counter${index}`}
            defaultValue={processingTime}
            placeholder={`${processingTime}`}
          ></input>
        </div>
      ))}
      <div>
        <span>Initial number of clients</span>{" "}
        <input
          type="text"
          name="client"
          placeholder="5"
          defaultValue="5"
        ></input>
      </div>
      <div>
        <button type="submit">Change</button>
      </div>
    </form>
  );
};

export default InitializeValuesForm;
