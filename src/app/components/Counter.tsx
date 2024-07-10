"use client";
import React, { useEffect, useState } from "react";
import { CounterInterface } from "../lib/definitions";

const Counter = (props: CounterInterface) => {
  const processTime = props.processingTimes || 2;
  const processing = props.processing;
  const title = props.title;

  useEffect(() => {
    let timeout = undefined;

    if (processing) {
      timeout = setTimeout(() => {
        props.updateCounterProcess(props.id, false);
        props.updateCounterProcessedClients(props.id);
      }, processTime * 1000);
    }
    return () => clearTimeout(timeout);
  }, [processing]);

  return (
    <div
      data-testid={`counter-${props.id}`}
      className="border-solid border-2 border-slate-200 rounded-md p-2"
    >
      <div>{title}</div>
      <div data-testid={`processing-counter-${props.id}`}>
        {props.processing ? "processing" : "idle"}
      </div>
      <div>
        Proccessed:{" "}
        <span data-testid={`processed-counter-${props.id}`}>
          {props.clientsCounterProcessed}
        </span>
      </div>
    </div>
  );
};

export default Counter;
