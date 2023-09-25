# FROM node:18

# # Install dependencies only when needed
# # # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# # RUN apk add --no-cache libc6-compat
# RUN mkdir -p /app
# WORKDIR /app

# # Install dependencies based on the preferred package manager
# COPY yarn.lock ./
# COPY package.json ./
# RUN yarn install

# COPY . .

# CMD ["yarn", "run", "dev"] 