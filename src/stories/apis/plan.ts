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

export { getPlansApiHandler };
