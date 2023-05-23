import { ProxyMarked } from "comlink";

interface CounterAPI extends ProxyMarked {
  value: number;
  increment: () => void;
}

export type CounterAPIFactory = (initialValue: number) => CounterAPI;
