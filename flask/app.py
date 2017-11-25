from flask import Flask, jsonify, request, make_response, url_for, json
from flask_cors import CORS, cross_origin
import os
import datetime
from helpers import *

# for stock data
import numpy as np
import pandas as pd
import quandl

# for JSON writing
import json
from requests import get
from io import BytesIO
from zipfile import ZipFile

app = Flask(__name__)
app.config.from_object("config")
cors = CORS(app, resources={r"/analyze_portfolio/*": {"origins": '*'}})
quandl.ApiConfig.api_key = app.config["QUANDL_API_KEY"]

@app.route('/')
def home():
    return "There doesn't seem to be anything here"

@app.route('/favicon.ico')
def favicon():
    return (url_for('static', filename='favicon.ico',mimetype='image/vnd.microsoft.icon'))

@app.route('/<ticker>/', defaults={'time_frame': ''})
@app.route('/<ticker>/<time_frame>/', methods=['GET','POST'])
def fetch_stock_data(ticker, time_frame):
    start_date = get_start_date(time_frame)
    name = quandl.Dataset('EOD/' + ticker).name.split(" (" + ticker + ")")[0]
    stock = quandl.get("EOD/" + ticker + ".11", start_date=start_date)
    dates = list(stock.reset_index()['Date'].dt.strftime(date_format="%Y-%m-%d"))
    log_returns = np.log(stock['Adj_Close'] / stock['Adj_Close'].shift(1))
    log_return = log_returns.mean() * 250
    variance = log_returns.var() * 252
    volatility = variance ** 0.5
    response = make_response(
                jsonify(
                    name = name,
                    ticker = ticker,
                    start_date = str(stock.head(1).reset_index()['Date'][0])[0:10],
                    end_date = str(stock.tail(1).reset_index()['Date'][0])[0:10],
                    price = round(stock.iloc[-1]['Adj_Close'], 2),
                    log_return = log_return,
                    volatility = volatility,
                    # following lines work fine; ready for graphing afaik
                    # commented out for clutter until needed
                    adj_close = dict(zip(dates, list(stock['Adj_Close']))),
                    #log_returns = dict(zip(dates, list(log_returns)))
                    )
                )
    response.headers['Access-Control-Allow-Origin'] = '*' #app.config["FRONTEND_URL"]
    return response

@app.route('/analyze_portfolio/', methods=['GET','POST'])
def analyze_portfolio():
    if request.method == 'POST':
        data = request.get_json(silent=True)
        portfolio = {'data': data.get('portfolio')}
        response = make_response(
            jsonify(
                portfolio = portfolio
            )
        )
        response.headers['Access-Control-Allow-Origin'] = '*' #app.config["FRONTEND_URL"]
        return response
    else:
        return "There doesn't seem to be anything here."

@app.route('/refresh_stock_list/')
def refresh_stock_list():
    # download zip
    request = get('https://www.quandl.com/api/v3/databases/EOD/codes?api_key=bTsRUM_EehoY-c3npqhG')
    # open zip
    zip_file = ZipFile(BytesIO(request.content))
    files = zip_file.namelist()
    # sort into tuples
    ticker_name_tuples = []
    for i in list(zip_file.open(files[0])):
        step_one = str(i).split('EOD/')[1]
        ticker = step_one.split(',')[0]
        step_two = step_one.split(ticker + ',"')[1]
        name = step_two.split('({})'.format(ticker))[0]
        ticker_name_tuples.append((ticker, name))
    # sort into json
    ticker_name_json = [{'ticker': ticker, 'name': name, 'string': ticker + ' | ' + name } for ticker, name in ticker_name_tuples]
    # write file
    # local (development)
    with open(app.config["FRONTEND_PATH"] + '/src/resources/ticker_name_pairs.json', 'w') as outfile:
        json.dump(ticker_name_json, outfile)
    #return str(outfile.name)
    # AWS (production)
    with open('/tmp/ticker_name_pairs.json', 'w') as outfile:
        json.dump(ticker_name_json, outfile)
    file = open('/tmp/ticker_name_pairs.json', 'rb')
    file.filename = 'ticker_name_pairs.json'
    file.content_type = 'application/json'
    output = upload_file_to_s3(file, app.config["S3_BUCKET"])
    return str(output)

if __name__ == '__main__':
    app.run()
