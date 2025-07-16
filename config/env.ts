/**
 * Validates that an environment variable is defined and throws a descriptive error if not
 * @param key - The environment variable key
 * @param value - The environment variable value
 * @returns The environment variable value if defined
 * @throws Error if the environment variable is undefined
 */
const validateEnvVar = (key: string, value: string | undefined): string => {
  if (!value) {
    throw new Error(`Environment variable '${key}' is not defined. Please check your environment configuration.`);
  }
  return value;
};

const env = {
  MAIN_DOMAIN: validateEnvVar('NEXT_PUBLIC_MAIN_DOMAIN', process.env.NEXT_PUBLIC_MAIN_DOMAIN),
  BASE_API_URL: validateEnvVar('NEXT_PUBLIC_BASE_API_URL', process.env.NEXT_PUBLIC_BASE_API_URL),
};

export default env;
