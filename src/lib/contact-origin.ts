type DeploymentEnvironment = Record<string, string | undefined>;

export function allowsContactOrigin(
  origin: string | null,
  requestOrigin: string,
  environment: DeploymentEnvironment = process.env,
) {
  if (!origin) return true;
  if (origin === new URL(environment.SITE_URL || requestOrigin).origin)
    return true;
  if (environment.VERCEL_ENV !== "preview") return false;
  return [environment.VERCEL_URL, environment.VERCEL_BRANCH_URL]
    .filter(Boolean)
    .some((host) => origin === `https://${host}`);
}
