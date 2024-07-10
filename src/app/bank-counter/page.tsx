"use client";
import React, { useEffect, useState } from "react";

import Counter from "../components/Counter";
import { CounterInterface } from "../lib/definitions";
import InitializeValuesForm from "../components/InitializeValuesForm";

const initialCountersState: CounterInterface[] = [
  {
    id: 1,
    title: "Counter 1",
  },
  {
    id: 2,
    title: "Counter 2",
  },
  {
    id: 3,
    title: "Counter 3",
  },
  {
    id: 4,
    title: "Counter 4",
  },
];

const BankCounterPage = () => {
  const [start, setStart] = useState(false);

  // Represents the processing time of each counter
  const [processingTimes, setprocessingTimes] = useState<number[]>([
    2, 3, 4, 5,
  ]);

  // Represents the current state of each counter
  const [areCountersProcessing, setAreCountersProcesssing] = useState([
    false,
    false,
    false,
    false,
  ]);

  // Represents the amount of clients processed by each counter
  const [
    numberOfClientsCountersProcessed,
    setNumberOfClientsCountersProcessed,
  ] = useState([0, 0, 0, 0]);

  // Represents the total number of people waiting
  const [queue, setQueue] = useState<number>(5);

  // function handler for updating the status of each counter
  const updateProcessingCounters = (
    counterNumber: number,
    processing: boolean
  ) => {
    setAreCountersProcesssing((countsersProcessing) => {
      const currentCountersStatus = [...countsersProcessing];
      currentCountersStatus[counterNumber] = processing;
      return currentCountersStatus;
    });
  };

  // function handler for updating the number of clients processed by each counter
  const updateNumberOfClientsCounterHasProcessed = (counterNumber: number) => {
    setNumberOfClientsCountersProcessed((numberOfClientsCountersProcessed) => {
      const currentCountersClientProcessed = [
        ...numberOfClientsCountersProcessed,
      ];
      currentCountersClientProcessed[counterNumber] =
        numberOfClientsCountersProcessed[counterNumber] + 1;
      return currentCountersClientProcessed;
    });
  };

  const subtractQueue = () => {
    setQueue((queue) => queue - 1);
  };

  const incrementQueue = () => {
    if (!start) {
      setStart(true);
    } else {
      setQueue((queue) => queue + 1);
      processClients();
    }
  };

  // Function used to add clients to counter if there are available ones.
  // Will check first if there is an available
  const processClients = () => {
    const counterIndexAvailable = areCountersProcessing.findIndex(
      (counterProcessing) => !counterProcessing
    );
    if (counterIndexAvailable > -1) {
      subtractQueue();
      updateProcessingCounters(counterIndexAvailable, true);
    }
  };

  const updateInitialState = (processingTimes: number[], queue: number) => {
    setprocessingTimes(processingTimes);
    setQueue(queue);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (queue > 0 && start) {
        processClients();
      }
    });
    return () => clearTimeout(timeout);
  }, [queue, areCountersProcessing, start]);

  return (
    <div className="m-5">
      <div
        className="flex justify-between items-center w-full max-w-screen-lg m-auto"
        data-testid="container"
      >
        {initialCountersState.map((counter, index) => (
          <Counter
            key={counter.id}
            {...counter}
            id={index}
            processing={areCountersProcessing[index]}
            processingTime={processingTimes[index]}
            numberOfClientsProcessed={numberOfClientsCountersProcessed[index]}
            updateProcessingCounters={updateProcessingCounters}
            updateNumberOfClientsCounterHasProcessed={
              updateNumberOfClientsCounterHasProcessed
            }
          ></Counter>
        ))}
      </div>
      <div className="flex flex-col w-full justify-evenly items-left max-w-screen-lg m-auto my-5">
        Number of people waiting:{" "}
        <span data-testid="queue" className="font-bold">
          {queue}
        </span>
        <div>
          <button
            data-testid="next-button"
            onClick={() => incrementQueue()}
            className="self-end p-2 mt-2 border-solid rounded-md border-2 border-slate-200"
          >
            Next 1
          </button>
        </div>
      </div>
      <hr></hr>
      <div className="my-5">
        <InitializeValuesForm
          processingTimes={processingTimes}
          queue={queue}
          updateInitialState={updateInitialState}
        ></InitializeValuesForm>
      </div>
    </div>
  );
};

export default BankCounterPage;
