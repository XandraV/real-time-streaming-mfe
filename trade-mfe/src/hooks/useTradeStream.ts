import { useEffect } from "react";
import protobuf from "protobufjs";

export function useTradeStream(onMessage: (data: any) => void) {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000");

    let tradeType: protobuf.Type;

    protobuf.load("/proto/trade.proto").then((root) => {
      tradeType = root.lookupType("Trade");

      socket.onmessage = async (event) => {
        if (!tradeType) return;

        const buffer = await event.data.arrayBuffer();
        const uint8Array = new Uint8Array(buffer);
        const message = tradeType.decode(uint8Array);

        const object = tradeType.toObject(message, {
          longs: String,
          enums: String,
          bytes: String,
        });
        onMessage(object);
      };
    });

    return () => {
      socket.close();
    };
  }, [onMessage]);
}
