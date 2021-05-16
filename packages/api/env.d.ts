declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GCLIENT_ID: string;
      GCLIENT_SECRET: string;
    }
  }
}
export {};
