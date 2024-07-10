// Contains all the type / interface defnitions of the project

export interface CounterInterface {
  id: number;
  title: string;
  processing?: boolean;
  clientsCounterProcessed?: number;
  processingTimes?: number;
  updateCounterProcess: (counterNumber: number, processing: boolean) => void;
  updateCounterProcessedClients: (counterNumber: number) => void;
  incrementQueue: () => void;
}
