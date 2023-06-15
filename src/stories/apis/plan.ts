import { serverAPI } from './msw';
import planStubManager from '@/stories/apis/data/plan';

const getPlansApiHandler = serverAPI.get('/plan/between', (req, res, ctx) => {
  const timeMin = req.url.searchParams.get('timemin');
  const timeMax = req.url.searchParams.get('timemax');

  if (!timeMin || !timeMax) {
    return res(
      ctx.status(400),
      ctx.json({ message: 'timemin, timemax 값을 제대로 입력해주세요' }),
    );
  }

  const data = planStubManager.get({ timeMin, timeMax });
  return res(ctx.status(200), ctx.json({ data, success: true }));
});

const createPlanApiHandler = serverAPI.post('/plan', async (req, res, ctx) => {
  const planData = await req.json();
  const plan = planStubManager.add(planData);

  return res(ctx.status(201), ctx.json({ data: plan, success: true }));
});

const updatePlanApiHandler = serverAPI.put(
  `/plan/:id`,
  async (req, res, ctx) => {
    const id = Number(req.params?.id);

    if (isNaN(id)) {
      return res(
        ctx.status(400),
        ctx.json({ success: false, message: '잘못된 id 입니다' }),
      );
    }

    const planData = await req.json();
    const plan = planStubManager.update({ id, ...planData });

    return res(ctx.status(200), ctx.json({ data: plan, success: true }));
  },
);

export { getPlansApiHandler, createPlanApiHandler, updatePlanApiHandler };
