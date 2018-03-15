export class Transfer {
  _id?: string;
  clientIds: string[] = [];
  fileName: string;
  fileSize: number;
  usage: CpuUsage[] = [];
}

export class CpuUsage {
  client: string;
  usage: number[];
}
