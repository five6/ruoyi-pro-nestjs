FROM node:16-alpine AS production

# 设置环境变量
ENV NODE_ENV=docker
ENV PORT=7000

# 暴露端口
EXPOSE 80
EXPOSE 443
EXPOSE $PORT

# 设置工作目录
WORKDIR /usr/src/app

# 复制依赖文件并安装生产依赖
COPY package*.json ./

RUN npm config set registry https://registry.npm.taobao.org/

RUN npm install --only=production --omit=dev

# 配置配置文件
COPY .env.* ./

# 复制构建产物
COPY ./dist ./dist

# 运行应用程序
CMD ["node", "dist/main"]
