export const loginV1 = (req, res) => {
  if (!req.rateLimit) return;
  res.status(req.data.status).send(req.data);
};
