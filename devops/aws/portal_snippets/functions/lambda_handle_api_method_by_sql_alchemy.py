import os, logging
from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# environment variables
host_name = os.environ["HOST"]
user_name = os.environ["USER_NAME"]
password = os.environ["PASSWORD"]
database_name = os.environ["DB_NAME"]
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# establishing connectivity - the engine
engine = create_engine(f'postgresql+psycopg2://{user_name}:{password}\
@{host_name}/{database_name}')

Base = declarative_base()
    
class Staff(Base):
    __tablename__ = "staffs"
    
    id = Column("id", Integer, primary_key=True)
    first_name = Column("first_name", String)
    last_name = Column("last_name", String)
    age = Column("age", Integer)
    
    def __init__(self, id, first_name, last_name, age):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.age = age

    def __repr__(self):
        return f"({self.id}) {self.first_name} {self.last_name} (age {self.age})"

Base.metadata.create_all(bind=engine) 

def lambda_handler(event, context):
    event_context = event["context"]
    method = event_context["http-method"]

    Session = sessionmaker(bind=engine)
    session = Session()


    if method == "POST":
        data = event["body-json"]
        
        staff = Staff(
            data["id"],
            data["first_name"],
            data["last_name"],
            data["age"],
        )
        session.add(staff)
        session.commit()
        return "Create staff success"
        
    elif method == "GET":
        json_results = []
        results = session.query(Staff).all()
        session.commit()
        for r in results:
            json_results.append({
                "id": r.id,
                "first_name": r.first_name,
                "last_name": r.last_name,
                "age": r.age
            })
        
        return json_results
        
# clean up - drop all table
# Base.metadata.drop_all(bind=engine)