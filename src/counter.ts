import * as comlink from "comlink";
import Worker from "./worker?worker";
import { CounterAPIFactory } from "./types";

const worker = new Worker(new URL("./worker.js", import.meta.url));
const { port1, port2 } = new MessageChannel();

function loggingPort(port: MessagePort): MessagePort {
  const oldPostMessage = port.postMessage.bind(port);
  port.onmessage = (ev) => {
    console.log("Received in MAIN:", ev.data);
  };
  port.postMessage = (message: any, transfer: Transferable[]) => {
    console.log("Sent from MAIN:", message);
    oldPostMessage(message, transfer);
  };
  return port;
}

worker.postMessage({ port: loggingPort(port2) }, [port2]);

export async function setupCounter(element: HTMLButtonElement) {
  const setCounter = (count: number) => {
    element.innerHTML = `count is ${count}`;
  };
  const intitialValue = 1;
  const createCounter = comlink.wrap<CounterAPIFactory>(loggingPort(port1));
  const counter = await createCounter(intitialValue);
  setCounter(await counter.value);
  element.addEventListener("click", async () => {
    await counter.increment();
    setCounter(await counter.value);
  });
}
