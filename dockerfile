# ARM64 아키텍처용 Python 베이스 이미지를 사용
FROM --platform=linux/arm64 python

# 필요한 시스템 패키지 설치
RUN apt-get update \
	&& apt-get install -y --no-install-recommends \
		postgresql-client \
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
