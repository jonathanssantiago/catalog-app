FROM python:3.7-alpine

COPY . /src

WORKDIR /src

RUN pip install -r requirements.txt

ENTRYPOINT ["python3", "/src/app.py"]