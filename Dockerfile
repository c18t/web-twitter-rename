FROM node:alpine

# アプリフォルダ
ENV APP_DIR /var/opt/app

# Listen port(CMD実行時に参照)
ENV PORT 3000

# 公開ポート
EXPOSE 3000

# ローカルのソースファイルをコピー
COPY . ${APP_DIR}

RUN set -x && \
: "trkunユーザーを作成" && \
  adduser -D -s /bin/bash trkun && \
: "アプリディレクトリの所有者を変更" && \
  chown -R trkun:trkun ${APP_DIR}

# ユーザーを変更
USER trkun

# 作業ディレクトリ
WORKDIR ${APP_DIR}

RUN set -x && \
: "アプリをビルド" && \
  yarn install && \
  yarn build

# アプリを実行
ENTRYPOINT [ "/bin/sh", "-c" ]
CMD [ "yarn start" ]