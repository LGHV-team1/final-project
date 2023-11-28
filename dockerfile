FROM --platform=linux/arm64 python

# 패키지 업데이트 및 필요한 패키지 설치
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 의존성 파일 복사
COPY requirements.txt ./

# Python 의존성 설치
RUN pip install -r requirements.txt

# 애플리케이션 파일 복사
COPY . .

# 서버가 사용할 포트 번호
EXPOSE 80

# 컨테이너 실행 명령
CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]
