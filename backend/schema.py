from pydantic import BaseModel, Field
from typing import Optional

class User(BaseModel):
    username : str
    email : str
    password : str
    role : Optional[str] = "user"

class User_login(BaseModel):
    email : str
    password: str

class admin(BaseModel):
    img:str
    name: str
    email:str
    role:str
    password: str
        
class User_list(BaseModel):
    role : str

class Most_Wanted(BaseModel):
    name : str
    img: str
    description : str
    duration:str
    age:int
    dob: str
    city: str
    rank:int
    commited:str
    sex:str
    height:float

class Tip(BaseModel):
    # title: Optional[str] =None
    description : str
    name : str 
    against: str
    header : str
    
class Announcements(BaseModel):
    title: str
    content : str
    img : str
    # like : Optional[int] = 0
    by : str

class Job(BaseModel):
    title:str
    vacancy:int
    requirements: str
    status: str
    department: str
    salary: int
    description: str
    deadline: str

