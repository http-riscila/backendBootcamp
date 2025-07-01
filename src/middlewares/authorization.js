import prisma from "../config/prisma-client.js";

function authorizeAdmin(req, res, next) {
  if (!req.user.id || req.user.isAdmin) {
    return res
      .status(403)
      .json({ message: "Access denied | User must be an admin" });
  }
  next();
}

async function authorizeCommunityMember(req, res, next) {
  const userId = req.user.id;
  const communityId = req.params.id || req.body.communityId;

  if (!communityId) {
    return res.status(400).json({ message: "Community ID not provided." });
  }

  try {
    const isMember = await prisma.communityMember.findFirst({
      where: {
        userId: userId,
        communityId: communityId,
      },
    });
    if (!isMember) {
      return res
        .status(403)
        .json({ message: "Access denied. User must be a community member" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default { authorizeAdmin, authorizeCommunityMember };
