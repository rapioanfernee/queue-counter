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
    <div>
      <div>{title}</div>
      <div>{props.processing ? "processing" : "idle"}</div>
      <div>Proccessed: {props.clientsCounterProcessed}</div>
    </div>
  );
};

export default Counter;
