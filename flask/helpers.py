import boto3, botocore
from config import S3_KEY, S3_SECRET, S3_BUCKET, S3_LOCATION
import datetime

def get_start_date(time_frame):
    today = datetime.datetime.today()
    if time_frame == '1W':
        days_ago = 7
        start_date = today - datetime.timedelta(days=days_ago)
    elif time_frame == '1M':
        days_ago = 30
        start_date = today - datetime.timedelta(days=days_ago)
    elif time_frame == '3M':
        days_ago = 90
        start_date = today - datetime.timedelta(days=days_ago)
    elif time_frame == '1Y':
        days_ago = 365
        start_date = today - datetime.timedelta(days=days_ago)
    elif time_frame == '5Y':
        days_ago = 1826
        start_date = today - datetime.timedelta(days=days_ago)
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
