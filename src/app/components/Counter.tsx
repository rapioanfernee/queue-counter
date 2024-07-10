"use client";
import React, { useEffect, useState } from "react";
import { CounterInterface } from "../lib/definitions";

interface CounterProps {
  processingTime: number;
  processing: boolean;
  numberOfClientsProcessed: number;
  updateProcessingCounters: (
    counterIndex: number,
    isCounterProcessing: boolean
  ) => void;
  updateNumberOfClientsCounterHasProcessed: (counterIndex: number) => void;
}

const Counter = (props: CounterInterface & CounterProps) => {
  const processTime = props.processingTime || 2;
  const processing = props.processing;
  const title = props.title;

  useEffect(() => {
    let timeout = undefined;

    if (processing) {
      timeout = setTimeout(() => {
        props.updateProcessingCounters(props.id, false);
        props.updateNumberOfClientsCounterHasProcessed(props.id);
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
          {props.numberOfClientsProcessed}
        </span>
      </div>
    </div>
  );
};

export default Counter;
