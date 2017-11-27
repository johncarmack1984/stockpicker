import os

CORS_HEADERS              = 'Content-Type'

FRONTEND_URL              = 'http://localhost:3000'
FRONTEND_PATH             = '/Users/johncarmack/Dropbox/sites/stockpicker/react/stockpicker'
QUANDL_API_KEY            = 'bTsRUM_EehoY-c3npqhG'

S3_BUCKET                 = 'spio-middleware-resources'
S3_KEY                    = 'AKIAIUNYRTKSP3MRITVA'
S3_SECRET                 = '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'
S3_LOCATION               = 'http://{}.s3.amazonaws.com/'.format(S3_BUCKET)

SECRET_KEY                = os.urandom(32)
PORT                      = 5000
