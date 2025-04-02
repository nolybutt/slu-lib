import { invoke, SeelenCommand, SeelenEvent } from '../handlers/mod.ts';
import { List } from '../utils/List.ts';
import { enumFromUnion } from '../utils/enums.ts';
import type { BluetoothDevice, BluetoothDevicePairShowPinRequest, BluetoothMajorClass } from '@seelen-ui/types';
import type { UnlistenFn } from '@tauri-apps/api/event';
import { subscribe } from '../handlers/invokers.ts';
import { createInstanceInvoker, createInstanceOnEvent } from '../utils/State.ts';

declare global {
  interface ArgsByCommand {
    [SeelenCommand.GetConnectedBluetoothDevices]: null;
    [SeelenCommand.GetBluetoothRadioState]: null;
    [SeelenCommand.SetBluetoothRadioState]: { state: boolean };
    [SeelenCommand.StartBluetoothScanning]: null;
    [SeelenCommand.StopBluetoothScanning]: null;
    [SeelenCommand.PairBluetoothDevice]: { address: bigint };
    [SeelenCommand.ForgetBluetoothDevice]: { id: string };
    [SeelenCommand.ConfirmBluetoothDevicePair]: { accept: boolean; passphrase: string };
  }
  interface ReturnByCommand {
    [SeelenCommand.GetConnectedBluetoothDevices]: BluetoothDevice[];
    [SeelenCommand.GetBluetoothRadioState]: boolean;
    [SeelenCommand.SetBluetoothRadioState]: void;
    [SeelenCommand.StartBluetoothScanning]: void;
    [SeelenCommand.StopBluetoothScanning]: void;
    [SeelenCommand.PairBluetoothDevice]: void;
    [SeelenCommand.ForgetBluetoothDevice]: void;
    [SeelenCommand.ConfirmBluetoothDevicePair]: void;
  }

  interface PayloadByEvent {
    [SeelenEvent.BluetoothRadioStateChanged]: boolean;
    [SeelenEvent.BluetoothDevicesChanged]: BluetoothDevice[];
    [SeelenEvent.BluetoothDiscoveredDevicesChanged]: BluetoothDevice[];
    [SeelenEvent.BluetoothPairShowPin]: BluetoothDevicePairShowPinRequest;
    [SeelenEvent.BluetoothPairRequestPin]: void;
  }
}

export class BluetoothRadio {
  constructor(public state: boolean) {}

  static readonly getAsync = createInstanceInvoker(this, SeelenCommand.GetBluetoothRadioState);
  static readonly onChange = createInstanceOnEvent(this, SeelenEvent.BluetoothRadioStateChanged);
  static async setState(state: boolean): Promise<void> {
    return await invoke(SeelenCommand.SetBluetoothRadioState, { state });
  }
}
export class BluetoothDevices extends List<BluetoothDevice> {
  static readonly getAsync = createInstanceInvoker(
    this,
    SeelenCommand.GetConnectedBluetoothDevices,
  );
  static readonly onChange = createInstanceOnEvent(this, SeelenEvent.BluetoothDevicesChanged);
  static readonly onDiscoveredDevicesChange = createInstanceOnEvent(
    this,
    SeelenEvent.BluetoothDiscoveredDevicesChanged,
  );

  static async discover(): Promise<void> {
    return await invoke(SeelenCommand.StartBluetoothScanning);
  }
  static async stopDiscovery(): Promise<void> {
    return await invoke(SeelenCommand.StopBluetoothScanning);
  }

  static async pairDevice(address: bigint): Promise<void> {
    return await invoke(SeelenCommand.PairBluetoothDevice, { address });
  }
  static async forgetDevice(id: string): Promise<void> {
    return await invoke(SeelenCommand.ForgetBluetoothDevice, { id });
  }
  static async confirmPair(accept: boolean, passphrase: string): Promise<void> {
    return await invoke(SeelenCommand.ConfirmBluetoothDevicePair, { accept, passphrase });
  }

  static async onPairRequest(
    cb: (param: BluetoothDevicePairShowPinRequest | void) => void,
  ): Promise<UnlistenFn> {
    //TODO(Eythaan): from here the process does not continues
    const unlistenShowPin = await subscribe(SeelenEvent.BluetoothPairShowPin, (param) => cb(param.payload));
    const unlistenRequestPin = await subscribe(SeelenEvent.BluetoothPairRequestPin, (param) => cb(param.payload));

    return () => {
      unlistenRequestPin();
      unlistenShowPin();
    };
  }

  static default(): BluetoothDevices {
    return new this([]);
  }
}

const BluetoothMajor = enumFromUnion<BluetoothMajorClass>({
  Miscellaneous: 'Miscellaneous',
  Computer: 'Computer',
  Phone: 'Phone',
  NetworkAccessPoint: 'NetworkAccessPoint',
  AudioVideo: 'AudioVideo',
  Peripheral: 'Peripheral',
  Imaging: 'Imaging',
  Wearable: 'Wearable',
  Toy: 'Toy',
  Health: 'Health',
  Uncategorized: 'Uncategorized',
});

export { BluetoothMajor };
