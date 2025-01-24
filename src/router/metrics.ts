import { Router } from 'express';

import {
  registerHomeAccess,
  getHomeAccessMetrics,
  getHomeAccessByCountry,
  registerRaidAccess,
  getRaidAccessMetrics,
  getRaidAccessTrending,
  // registerBotMessageInRaid,
  // getBotMessagesByRaid,
  // registerLinkAccess,
  // getLinkAccessMetrics,
  // getLinkAccessByLink,
  // registerChatMessage,
  // getChatMessageMetrics,
  // registerArtSubmission,
  // getArtSubmissionMetrics,
  // getArtProducersMetrics,
} from '@/controllers/metrics/index.js';

const router = Router();

// Home (Acessos ao site)
router.post('/home', registerHomeAccess);
router.get('/home', getHomeAccessMetrics);
router.get('/home/countries', getHomeAccessByCountry);

// Raids (Acessos e mensagens)
router.post('/raids', registerRaidAccess);
router.get('/raids', getRaidAccessMetrics);
router.get('/raids/trending', getRaidAccessTrending);
// router.post('/raids/bot-messages', registerBotMessageInRaid);
// router.get('/raids/bot-messages', getBotMessagesByRaid);

// Links (Acessos a links)
// router.post('/links', registerLinkAccess);
// router.get('/links', getLinkAccessMetrics);
// router.get('/links/by-link', getLinkAccessByLink);

// Chat (Mensagens trocadas com o bot)
// router.post('/chat', registerChatMessage);
// router.get('/chat', getChatMessageMetrics);

// Arts (Envio de artes e métricas relacionadas)
// router.post('/arts', registerArtSubmission);
// router.get('/arts', getArtSubmissionMetrics);
// router.get('/arts/producers', getArtProducersMetrics);

export { router as metricsRoutes };
