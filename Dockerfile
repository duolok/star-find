FROM python:3.9

WORKDIR /app

RUN pip install flask

COPY . .

ENV FLASK_APP=src/index.py

EXPOSE 6969

CMD ["flask", "run", "--host", "0.0.0.0"]
