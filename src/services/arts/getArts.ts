import { ArtsModel, ArtsSchema } from '@/models/arts/index.js';

const RECORDS_PER_PAGE = 20;

export const artsData = async ({ page }: { page: number }) => {
  const skip = (page - 1) * RECORDS_PER_PAGE;

  const arts = await ArtsModel.find({ approved: true })
    .skip(skip)
    .limit(RECORDS_PER_PAGE)
    .exec();

  if (!arts || arts.length === 0) return null;

  const parsedArts = ArtsSchema.safeParse(arts);

  if (!parsedArts.success) return null;

  const next = arts.length === RECORDS_PER_PAGE;

  return { arts: parsedArts.data, page, next };
};
