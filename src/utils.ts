const { port1, port2 } = new MessageChannel();

export function wrapPortWithSource(port: MessagePort, source: "main" | "worker"): MessagePort {
  const originalPostMessage = port.postMessage;

  port.postMessage = function (message: any, transferList: Transferable[]): void {
    const modifiedMessage = { ...message, source, port: source === "main" ? port2 : port1 };
    originalPostMessage.call(this, modifiedMessage, transferList);
  };

  return port;
}
