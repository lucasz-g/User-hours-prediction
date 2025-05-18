from pydantic import field_validator, BaseModel, EmailStr
import re
from enum import Enum

class genderEnum(str, Enum):
    MALE = 'MALE'
    FEMALE = 'FEMALE'

class UserSchema(BaseModel):
    username: str
    email: EmailStr
    password: str
    age: int
    gender: genderEnum
    number_of_kids: int
    
    @field_validator('password')
    def validate_password(cls, password):
        # Validação: A senha deve ter pelo menos 8 caracteres, 1 letra maiúscula e 1 número
        if len(password) < 8:
            raise ValueError('A senha deve ter pelo menos 8 caracteres.')
        if not re.search(r'[A-Z]', password):
            raise ValueError('A senha deve conter pelo menos uma letra maiúscula.')
        if not re.search(r'[0-9]', password):
            raise ValueError('A senha deve conter pelo menos um número.')
        return password
    
    @field_validator('age')
    def validate_age(cls, age):
        if age < 0:
            raise ValueError('A idade não pode ser negativa.')
        return age
    

    @field_validator('number_of_kids')
    def validate_number_of_kids(cls, number_of_kids):
        if number_of_kids < 0:
            raise ValueError('O número de filhos não pode ser negativo.')
        return number_of_kids

# Oculta o campo "password"
class UserPublic(BaseModel):
    id: int
    username: str
    email: EmailStr
    gender: genderEnum
    age: int
    number_of_kids: int

# Adiciona o campo "id"
class UserDB(BaseModel):
    id: int
    username: str
    email: EmailStr
    password: str
    gender: genderEnum
    age: int
    number_of_kids: int


class UserList(BaseModel):
    users: list[UserPublic]