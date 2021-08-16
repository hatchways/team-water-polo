export interface IPropContent {
  id: number;
  description: string;
  tag: string;
  images: string[];
  start: Date;
  title: string;
}

export interface IPropMethods {
  handleClose: () => void;
  updateEvent: (property: string, value: string) => void;
}
