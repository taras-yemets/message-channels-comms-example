export function wrapPortWithSource(port: MessagePort, source: "main" | "worker"): MessagePort {
  const originalPostMessage = port.postMessage;

  port.postMessage = function (message: any, transferList: Transferable[]): void {
    console.log(`modifiedMessage from ${source.toUpperCase()}`, message);
    originalPostMessage.call(this, message, transferList);
  };

  return port;
}
