import { config } from 'dotenv';


config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRY } = process.env;


//token

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODY2MjZlNmRhZDY4OGM2ZWMwYmY2NDEiLCJpYXQiOjE3NTE1MjUwOTQsImV4cCI6MTc1MTYxMTQ5NH0.Bzn0vwPbaodN0tAyBdWIYlPOnJOb9_YrhtkwkhbKVYk

// id
// 686626e6dad688c6ec0bf641