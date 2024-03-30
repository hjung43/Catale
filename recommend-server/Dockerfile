FROM python:3.9

WORKDIR /rec

COPY ./requirements.txt /rec/requirements.txt
COPY ./.env.dev /rec/.env.dev
COPY ./.env.prod /rec/.env.prod
COPY ./.env /rec/.env
# COPY ./.env* /rec

RUN pip install -r requirements.txt

COPY ./app /rec/app

WORKDIR /rec/app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]