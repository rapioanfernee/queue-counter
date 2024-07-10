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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between items-center w-full max-w-screen-md m-auto"
    >
      <div>Initialize values</div>
      {processingTimes.map((processingTime, index) => (
        <div
          className="flex w-full justify-evenly items-left"
          key={`${index}-${processingTime}`}
        >
          <span className="content-center flex-1">
            Counter {index} Processing Time
          </span>{" "}
          <input
            className="border-solid border-2 border-slate-200 rounded-md p-2 flex-1"
            type="text"
            name={`counter${index}`}
            defaultValue={processingTime}
            placeholder={`${processingTime}`}
          ></input>
        </div>
      ))}
      <div className="flex w-full justify-evenly items-left">
        <span className="content-center flex-1">Initial number of clients</span>{" "}
        <input
          className="border-solid border-2 border-slate-200 rounded-md p-2 flex-1"
          type="text"
          name="client"
          placeholder="5"
          defaultValue="5"
        ></input>
      </div>
      <div className="self-end p-2 mt-2 border-solid rounded-md border-2 border-slate-200">
        <button type="submit">Change</button>
      </div>
    </form>
  );
};

export default InitializeValuesForm;
