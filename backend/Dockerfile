FROM python:3.10-slim

RUN apt-get update && \
    apt-get install -y make gcc && \
    apt-get clean

WORKDIR /api
COPY ./requirements.txt ./requirements.txt

RUN pip install -r requirements.txt && rm requirements.txt

COPY . .

CMD ["uvicorn", "src.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]