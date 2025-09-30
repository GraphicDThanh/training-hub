### Create layer:

- Step 1: Install libraries to python folder
```bash
pip3 install -r requirements.txt --target python/python3.9/site-packages/
zip -r layer python/
```

- Step 2: Replace package psycopg2 by below folder with python version. Update copy folder to `psycopg2`

  For psycopg2 Python use https://github.com/jkehler/awslambda-psycopg2 

- Step 3: compress python folder and use to create layer
```bash
zip -r python layer.zip
```