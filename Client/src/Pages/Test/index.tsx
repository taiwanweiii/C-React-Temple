import { useState } from 'react';

interface StateType {
    name: string;
    number: number;
}

const Test: React.FC = () => {
    const [value, setValue] = useState<StateType>({ name: '123', number: 5 });

    return (
        <>
            這是TEST value: {JSON.stringify(value)}
            <Test1 V={value} setValue={setValue} />
        </>
    );
};

interface Test1Props {
    V: StateType;
    setValue: (val: StateType) => void;
}

const Test1: React.FC<Test1Props> = ({ V, setValue }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        setValue({ ...V, [type]: e.target.value }); // 更新物件中的 name
    };

    return (
        <>
            <div>這是test1: {V.name}</div>
            {console.log('測試是否渲染')}
            <input
                className="bg-red-500"
                value={V.name}
                onChange={(e) => handleChange(e, 'name')}
            />
            <input
                className="bg-blue-500"
                value={V.number}
                onChange={(e) => handleChange(e, 'number')}
            />
        </>
    );
};

export default Test;
