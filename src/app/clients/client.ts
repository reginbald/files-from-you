export class Client {
  _id?: string;
  name: string;
  email: string;
  transfers?: [FileTransfer];
}

export class FileTransfer {
  name: string;
  size: number;
  timeline: [CpuUsage];
}

export class CpuUsage {
  timestamp: string;
  usage: number;
}
