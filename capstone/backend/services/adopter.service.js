import db from '../models/index.js';

export async function findOrCreateAdopterFromAuth0(profile) {
  const auth0UserId = profile.id;
  const email = profile.emails?.[0]?.value || profile._json?.email;
  const name = profile.displayName || profile._json?.name || '';
  const pictureUrl = profile.photos?.[0]?.value || profile._json?.picture || null;

  if (!auth0UserId || !email) {
    throw new Error('Missing required Auth0 user profile fields');
  }

  const [adopter] = await db.Adopter.findOrCreate({
    where: { auth0_user_id: auth0UserId },
    defaults: {
      auth0_user_id: auth0UserId,
      email,
      name,
      picture_url: pictureUrl,
      is_active: true,
    },
  });

  const updates = {};
  if (adopter.email !== email) updates.email = email;
  if (adopter.name !== name) updates.name = name;
  if (adopter.picture_url !== pictureUrl) updates.picture_url = pictureUrl;

  if (Object.keys(updates).length > 0) {
    await adopter.update(updates);
  }

  return adopter;
}

export async function upsertAdopterFromJwtPayload(payload, overrides = {}) {
  const auth0UserId = payload?.sub;
  const email = overrides.email ?? payload?.email;
  const name = overrides.name ?? payload?.name ?? payload?.nickname ?? '';
  const pictureUrl = overrides.picture_url ?? payload?.picture ?? null;

  if (!auth0UserId || !email) {
    throw new Error('Missing required JWT claims to upsert adopter');
  }

  const [adopter] = await db.Adopter.findOrCreate({
    where: { auth0_user_id: auth0UserId },
    defaults: {
      auth0_user_id: auth0UserId,
      email,
      name,
      picture_url: pictureUrl,
      is_active: true,
    },
  });

  const updates = {};
  if (adopter.email !== email) updates.email = email;
  if (adopter.name !== name) updates.name = name;
  if (adopter.picture_url !== pictureUrl) updates.picture_url = pictureUrl;

  if (Object.keys(updates).length > 0) {
    await adopter.update(updates);
  }

  return adopter;
}


