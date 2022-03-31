import { baseSingerType } from '@/services/singer/type';
// 专辑详情
export interface albumType {
  name: string;
  id: number;
  picUrl: string;
  description: string;
  size: number;
  type: string;
  subType: string;
  publishTime: number;
  company: string;
  artists: baseSingerType[];
}
