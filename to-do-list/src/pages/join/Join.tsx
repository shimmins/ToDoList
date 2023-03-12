import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

// interface userInformation {
//     name : '';
//     id: '';
//     pw: '';
// }

export function Join(){
    const[name, setName] = useState('');
    const[id, setId] = useState('');
    const[password, setPassword] = useState('');
    const onName = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setName(event.target.value);
    }
    const onId = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setId(event.target.value);
    }
    const onPassword = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(event.target.value);
    }
    
    const navigate = useNavigate();

    const onSubmit = () =>{
        localStorage.setItem(id, password);
        navigate('../login');
    }

    return(
        <div style={{display: 'flex', flexDirection: 'column',alignItems: 'center', backgroundColor: '	#E6E6FA', height: '100vh', width: '100%'}}>
            <div>
                <h1>To-Do List</h1>
            </div>
            <div>
                <div>이름</div>
                <input style={{height: '20px', width: '100%'}}
                value={name}
                onChange={onName}
                type="text"
                />
            </div>
            <div>
                <div>아이디</div>
                <input style={{height: '20px', width: '100%'}}
                value={id}
                onChange={onId}
                type="text"
                />
            </div>
            <div>
                <div>비밀번호</div>
                <input style={{height: '20px', width: '100%'}}
                value={password}
                onChange={onPassword}
                type="text"
                />
            </div>
            <div style={{width: '100px'}}>
                <br></br>
                <Button onClick={onSubmit} type="primary" block>
                    회원가입
                </Button>
            </div>

        </div>
    );
}