# 使用官方 Ruby 3.1 Alpine 镜像，自动匹配宿主机架构
FROM ruby:3.1-alpine3.19

# 1. 换源并安装系统依赖（含后续 Python 需要的编译工具）
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories && \
    apk add --no-cache \
        build-base git python3 py3-pip py3-setuptools py3-wheel cython py3-yaml unzip font-noto-emoji

# 2. 工作目录
WORKDIR /usr/src/app

# 3. 复制依赖文件（充分利用缓存）
COPY Gemfile Gemfile.lock _cite/requirements.txt ./

# 4. Ruby 依赖：使用清华镜像 + 安装 bundler 后 bundle
RUN bundle config mirror.https://rubygems.org https://mirrors.tuna.tsinghua.edu.cn/rubygems && \
    VERSION=$(awk '/BUNDLED WITH/{getline; print}' Gemfile.lock | xargs) && \
    gem install bundler --version ${VERSION} && \
    bundle _${VERSION}_ install

# 5. Python 依赖：一次性装完
RUN python3 -m pip install --break-system-packages --no-cache-dir \
        -r requirements.txt \
        watchdog[watchmedo]==3.0.0

# 6. 复制项目源码
COPY . .

# 7. 暴露 Jekyll 默认端口
EXPOSE 4000 35729

# 8. 启动脚本
COPY .docker/entrypoint.sh /var/entrypoint.sh
RUN chmod +x /var/entrypoint.sh
CMD ["/var/entrypoint.sh"]