## Dev

1. Clone repository
2. Intall dependecies
3. Create file `.env` based in `.env.template`
4. Exec migration of Prisma `npx prisma migrate dev`
5. Start Server NATS
```
docker run -d --name nats-server -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```
6. Exec `npm run start:dev`

