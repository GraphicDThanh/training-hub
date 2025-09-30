from typing import Optional, List
from sqlalchemy.sql import func
from sqlalchemy import Column, Integer, String, SmallInteger, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, Mapped
from sqlalchemy.sql import func

Base = declarative_base()

def create_db_schema(engine):
    Base.metadata.create_all(engine)

def drop_db_schema(engine):
    Base.metadata.drop_all(engine)


class User(Base):
    __tablename__ = "users"
    
    uuid = Column(String, primary_key=True)
    email = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    role = Column(SmallInteger, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    # child: Mapped[Optional["Invoice"]] = relationship(back_populates="user")

    def __init__(self, uuid, email, first_name, last_name, role):
        self.uuid = uuid
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.role = role

        
    def __repr__(self):
        return f"({self.first_name}) {self.last_name} ({self.email}), role: {self.role}"


# class Invoice(Base):
#     __tablename__ = "invoices"
    
#     uuid = Column(String, primary_key=True)
#     amount = Column(Integer, nullable=False)
#     status = Column(SmallInteger, nullable=False)
#     created_at = Column(DateTime(timezone=True), server_default=func.now())
#     updated_at = Column(DateTime(timezone=True), onupdate=func.now())
#     customer: Mapped[List["User"]] = relationship(back_populates="invoices")

#     def __init__(self, uuid, user_uuid, amount):
#         self.uuid = uuid
#         self.user_uuid = user_uuid
#         self.amount = amount

#     def __repr__(self):
#         return f"Invoice for {self.amount} from {self.user_uuid}"
