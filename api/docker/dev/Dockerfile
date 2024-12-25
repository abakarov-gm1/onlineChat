FROM python

WORKDIR /app


COPY requirements.txt .

RUN python3 -m venv venv

RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

