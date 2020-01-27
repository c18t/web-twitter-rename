FROM node:13.5.0-alpine

# アプリフォルダ
ENV APP_DIR /var/opt/app

# Listen host,port(CMD実行時に参照)
ENV HOST 0.0.0.0
ENV PORT 3000

# ローカルのソースファイルをコピー
COPY . ${APP_DIR}

RUN set -x && \
  : "appユーザーを作成" && \
  adduser -D -s /bin/bash app && \
  : "アプリディレクトリの所有者を変更" && \
  chown -R app:app ${APP_DIR}

# ユーザーを変更
USER app

# 作業ディレクトリ
WORKDIR ${APP_DIR}

# 実行環境のインストール
RUN set -x && yarn install

# 公開ポート
EXPOSE ${PORT}

# ビルドと実行(--env-fileで渡した環境変数でクライアントをビルドしたい)
ENTRYPOINT [ "/bin/sh", "-c" ]
CMD [ "yarn build && yarn start" ]
