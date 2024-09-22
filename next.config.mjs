const {
  NEXT_PUBLIC_NBP_API_URL,
  NEXT_PUBLIC_NBP_CURRENCY_MIN_DATE,
  NEXT_PUBLIC_NBP_CURRENCY_MAX_DATE_RANGE_DIFFERENCE,
} = process.env;

if (
  !NEXT_PUBLIC_NBP_API_URL ||
  !NEXT_PUBLIC_NBP_CURRENCY_MIN_DATE ||
  !NEXT_PUBLIC_NBP_CURRENCY_MAX_DATE_RANGE_DIFFERENCE
) {
  throw new Error(
    'Please configure the environment variables. See .env.example',
  );
}

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
