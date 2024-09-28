export type TaskProps = {
  id: number;
  title: string;
  status: boolean;
  onCheck?: () => void;
  onRemove?: () => void;
};

export type RootStackParmList = {
  Home: undefined;
  Details: undefined;
};
