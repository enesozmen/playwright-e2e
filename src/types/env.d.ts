declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: string;
    TEST_ENV?: string;
    BASE_URL?: string;
    API_URL?: string;
    ADMIN_EMAIL?: string;
    ADMIN_PASSWORD?: string;
    USER_EMAIL?: string;
    USER_PASSWORD?: string;
    HEADLESS?: string;
    SLOW_MO?: string;
    CI?: string;
  }
}
