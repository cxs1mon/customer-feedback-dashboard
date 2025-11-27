export interface FeedbackDataModel {
  id: string;
  createdAt: string;
  productCategory: string;
  rating: number;
  comment: string;
  channel: string;
  sentiment: string;
  customerSegment: {
    id: string;
    name: string;
  };
  tags: string[];
}

export const initialFeedbackDataModel: FeedbackDataModel = {
  id: '',
  createdAt: '',
  productCategory: '',
  rating: 0,
  comment: '',
  channel: '',
  sentiment: '',
  customerSegment: {
    id: '',
    name: '',
  },
  tags: [],
};
