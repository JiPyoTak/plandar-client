interface ITagWithoutId {
  name: string;
}

interface ITag extends ITagWithoutId {
  id: number;
}

export type { ITag, ITagWithoutId };
