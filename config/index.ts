const config = {
  database: {
    URL:
      process.env.DATABASE_URL ||
      "postgresql://postgres.nyqpdgwobxxipfitdoca:hello123@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres",
  },
};

export default config;
