import prisma from "../config/prisma-client.js";

function authorizeAdmin(req, res, next) {
  if (!req.user.id || req.user.isAdmin) {
    return res
      .status(403)
      .json({ error: "Acesso negado. Usuário não é administrador." });
  }
  next();
}

async function authorizeCommunityMember(req, res, next) {
  const userId = req.user.id;
  const communityId = req.params.id || req.body.communityId;

  if (!communityId) {
    return res.status(400).json({ error: "ID da comunidade não fornecido." });
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
        .json({ error: "Acesso negado. Usuário não é membro da comunidade." });
    }
    next();
  } catch (error) {
    console.error("Erro ao verificar membro da comunidade:", error);
    return res
      .status(500)
      .json({ error: "Erro interno do servidor ao verificar membro." });
  }
}

export default { authorizeAdmin, authorizeCommunityMember };
