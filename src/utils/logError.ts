const logError = ({
  type,
  controller,
  error,
}: {
  type: 'bad-request' | 'internal-server-error';
  controller: string;
  error: unknown;
}) => {
  console.error(`[${type}] --> ${controller}:`, error);
};

export default logError;
