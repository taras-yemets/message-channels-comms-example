import * as comlink from "comlink";
import Worker from "./worker?worker";
import { CounterAPIFactory } from "./types";
import { wrapPortWithSource } from "./utils";

const worker = new Worker(new URL("./worker.js", import.meta.url));
const { port1, port2 } = new MessageChannel();
worker.postMessage({ port: port2 }, [port2]);

export async function setupCounter(element: HTMLButtonElement) {
  const setCounter = (count: number) => {
    element.innerHTML = `count is ${count}`;
  };
  const intitialValue = 1;
  const wrappedPort1 = wrapPortWithSource(port1, "main");
  const createCounter = comlink.wrap<CounterAPIFactory>(wrappedPort1);
  const counter = await createCounter(intitialValue);
  setCounter(await counter.value);
  element.addEventListener("click", async () => {
    await counter.increment();
    setCounter(await counter.value);
  });
}
