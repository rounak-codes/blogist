export const adminAuth = (req, res, next) => {
  const secret = req.headers["x-admin-secret"];
  if (secret && secret === process.env.ADMIN_SECRET) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized: Admin access only" });
  }
};
