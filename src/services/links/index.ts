import { LinksModel, LinksSchema } from '@/models/links/index.js';
import { todayFormatted } from '@/utils/todayFormatted.js';

export const linksData = async () => {
  const links = await LinksModel.find().exec();

  if (!links) {
    console.log(`No links found for date: ${todayFormatted}`);
    return null;
  }

  const parsedLinks = LinksSchema.safeParse(links);
  if (!parsedLinks.success) {
    console.log('Error parsing links data:', parsedLinks.error);
    return null;
  }

  return parsedLinks.data;
};
