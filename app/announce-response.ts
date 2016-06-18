export interface PeersResponse {
  'peer id': Buffer;
  'ip': string;
  'port': number;
}

export interface AnnounceResponse {
  'failure reason'?: string;
  'warning message'?: string;
  'interval'?: number;
  'min interval'?: number;
  'tracker id'?: string;
  'complete'?: number;
  'incomplete'?: number;
  'peers'?: PeersResponse[] | Buffer;
}
