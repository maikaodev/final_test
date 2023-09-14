export interface NewsProps {
  titulo: string;
  introducao: string;
  produto_id: number;
}

export interface ReleaseProps extends NewsProps {
  data_publicacao: string;
  link: string;
}

export interface ItemProps {
  news: NewsProps;
  release: ReleaseProps;
}

