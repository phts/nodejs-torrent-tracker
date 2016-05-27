import Peer from './peer';

interface AnnounceResponse {
  'failure reason'?: string;
  'warning message'?: string;
  'interval'?: number;
  'min interval'?: number;
  'tracker id'?: string;
  'complete'?: number;
  'incomplete'?: number;
  'peers'?: Peer[] | string;
}

export default AnnounceResponse;
