export type TaskProps = {
  id: number;
  title: string;
  status: boolean;
  descricao: string;
  onCheck?: () => void;
  onRemove?: () => void;
};

export type RootStackParmList = {
  Home: undefined;
  Details: undefined;
  'Lista de Tarefas': undefined;
  'Criar Tarefa': undefined;
  'Editar Tarefa': { taskId: string };
};
