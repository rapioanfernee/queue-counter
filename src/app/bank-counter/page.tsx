"use client";
import React, { useEffect, useState } from "react";

import Counter from "../components/Counter";
import { CounterInterface } from "../lib/definitions";
import InitializeValuesForm from "../components/InitializeValuesForm";

const initialCountersState: CounterInterface[] = [
  {
    id: 1,
    title: "Counter 1",
    updateCounterProcess: () => {},
    updateCounterProcessedClients: () => {},
    incrementQueue: () => {},
  },
  {
    id: 2,
    title: "Counter 2",
    updateCounterProcess: () => {},
    updateCounterProcessedClients: () => {},
    incrementQueue: () => {},
  },
  {
    id: 3,
    title: "Counter 3",
    updateCounterProcess: () => {},
    updateCounterProcessedClients: () => {},
    incrementQueue: () => {},
  },
  {
    id: 4,
    title: "Counter 4",
    updateCounterProcess: () => {},
    updateCounterProcessedClients: () => {},
    incrementQueue: () => {},
  },
];

const BankCounterPage = () => {
  const [start, setStart] = useState(false);

  // Represents the processing time of each counter
  const [processingTimes, setprocessingTimes] = useState<number[]>([
    2, 3, 4, 5,
  ]);

  // Represents the current state of each counter
  const [countersProcessing, setCountersProcesssing] = useState([
    false,
    false,
    false,
    false,
  ]);

  // Represents the amount of clients processed by each counter
  const [clientsCountersProcessed, setClientsCountersProcessed] = useState([
    0, 0, 0, 0,
  ]);

  // Represents the total number of people waiting
  const [queue, setQueue] = useState<number>(5);

  // function handler for updating the status of each counter
  const updateCounterProcess = (counterNumber: number, processing: boolean) => {
    setCountersProcesssing((countsersProcessing) => {
      const currentCountersStatus = [...countsersProcessing];
      currentCountersStatus[counterNumber] = processing;
      return currentCountersStatus;
    });
  };

  // function handler for updating the number of clients processed by each counter
  const updateCounterProcessedClients = (counterNumber: number) => {
    setClientsCountersProcessed((clientsCountersProcessed) => {
      const currentCountersClientProcessed = [...clientsCountersProcessed];
      currentCountersClientProcessed[counterNumber] =
        clientsCountersProcessed[counterNumber] + 1;
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
    const counterIndexAvailable = countersProcessing.findIndex(
      (counterProcessing) => !counterProcessing
    );
    if (counterIndexAvailable > -1) {
      subtractQueue();
      updateCounterProcess(counterIndexAvailable, true);
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
  }, [queue, countersProcessing, start]);

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "1024px",
          margin: "auto",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {initialCountersState.map((counter, index) => (
          <Counter
            key={counter.id}
            {...counter}
            id={index}
            processing={countersProcessing[index]}
            processingTimes={processingTimes[index]}
            clientsCounterProcessed={clientsCountersProcessed[index]}
            updateCounterProcess={updateCounterProcess}
            updateCounterProcessedClients={updateCounterProcessedClients}
            incrementQueue={incrementQueue}
          ></Counter>
        ))}
      </div>
      <div>
        Number of people waiting: {queue}
        <div>
          <button onClick={() => incrementQueue()}>Next 1</button>
        </div>
      </div>
      <hr></hr>
      <InitializeValuesForm
        processingTimes={processingTimes}
        queue={queue}
        updateInitialState={updateInitialState}
      ></InitializeValuesForm>
    </>
  );
};

export default BankCounterPage;
