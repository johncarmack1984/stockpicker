import boto3, botocore
from config import S3_KEY, S3_SECRET, S3_BUCKET, S3_LOCATION
import datetime

def get_start_date(time_frame):
    today = datetime.datetime.today()
    if time_frame == '1W':
        start_date = today - datetime.timedelta(days=7)
    elif time_frame == '1M':
        start_date = today - datetime.timedelta(days=30)
    elif time_frame == '3M':
        start_date = today - datetime.timedelta(days=90)
    elif time_frame == '1Y':
        start_date = today - datetime.timedelta(days=365)
    elif time_frame == '':
        start_date = ''

    if start_date != '':
        start_date = start_date.strftime('%Y-%m-%d')

    return start_date

s3 = boto3.client(
    "s3",
    aws_access_key_id=S3_KEY,
    aws_secret_access_key=S3_SECRET
)

def upload_file_to_s3(file, bucket_name, acl="public-read"):

    """
    Docs: http://boto3.readthedocs.io/en/latest/guide/s3.html
    """

    try:

        s3.upload_fileobj(
            file,
            bucket_name,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )

    except Exception as e:
        print("Something Happened: ", e)
        return e

    return "{}{}".format(S3_LOCATION, file.filename)
