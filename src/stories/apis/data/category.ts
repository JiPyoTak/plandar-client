import StubManager from '@/stories/apis/data';
import createRandomColor from '@/stories/utils/createRandomColor';
import { theme } from '@/styles/theme';
import { ICategory } from '@/types/rq/category';

const initialCategories = [
  {
    id: 1,
    name: '카테고리1',
    color: theme.primary,
  },
] as const;

class CategoryStubManager extends StubManager<ICategory> {
  private static instance: CategoryStubManager;
  constructor(initialCategoryArray?: ICategory[]) {
    if (CategoryStubManager.instance) {
      return CategoryStubManager.instance;
    }

    super(initialCategoryArray);
    CategoryStubManager.instance = this;
  }

  public createStub({ ...categoryData }: Partial<ICategory> = {}): ICategory {
    if (isNaN(Number(categoryData?.id))) {
      ++this.id;
    }

    const categoryStub = {
      id: this.id,
      name: `카테고리 ${this.id}`,
      color: createRandomColor(),
      ...categoryData,
    };

    return categoryStub;
  }
}

const categoryStubManager = new CategoryStubManager([...initialCategories]);

export default categoryStubManager;
