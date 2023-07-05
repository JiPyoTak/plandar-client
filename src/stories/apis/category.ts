import { serverAPI } from './msw';
import categoryStubManager from '@/stories/apis/data/category';

const getCategoryAPIHandler = serverAPI.get(`/category`, (req, res, ctx) => {
  const data = categoryStubManager.get();
  return res(ctx.status(200), ctx.json({ data, success: true }));
});

const createCategoryAPIHandler = serverAPI.post(
  `/category`,
  async (req, res, ctx) => {
    const categoryData = await req.json();
    const category = categoryStubManager.add(categoryData);

    return res(ctx.status(201), ctx.json({ data: category, success: true }));
  },
);

const updateCategoryAPIHandler = serverAPI.put(
  `/category/:id`,
  async (req, res, ctx) => {
    const id = Number(req.params?.id);

    if (isNaN(id)) {
      return res(
        ctx.status(400),
        ctx.json({ success: false, message: '잘못된 id 입니다' }),
      );
    }

    const categoryData = await req.json();
    const category = categoryStubManager.update(categoryData);

    return res(ctx.status(200), ctx.json({ data: category, success: true }));
  },
);

export {
  getCategoryAPIHandler,
  createCategoryAPIHandler,
  updateCategoryAPIHandler,
};
