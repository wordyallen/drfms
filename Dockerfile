FROM python:2.7
ADD . /drfms
WORKDIR /drfms
RUN pip install -r requirements.txt
