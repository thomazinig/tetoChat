import React, { useState } from "react";
import Header from '../components/header';
import Background from '../components/background';
import { GrAdd, GrMoreVertical } from 'react-icons/gr';
import MainContainer from '../components/mainContainer';
import ModalDepartamentos from '../components/modalDepartamentos';

interface Line {
    text: string;
    icon: React.ReactNode;
}

const Departamentos: React.FC = () => {
    const [lines, setLines] = useState<Line[]>([
        { text: 'Orçamentos', icon: <GrMoreVertical /> }
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addLine = (text: string) => {
        setLines([...lines, { text, icon: <GrMoreVertical /> }]);
        setIsModalOpen(false);
    };
    return(
        <div>
            <Header />
            <Background
                text="Departamentos"
                btn1={<GrAdd onClick={() => setIsModalOpen(true)} />}
            >
                <MainContainer
                    p1="Nome"
                    p6="Ações"
                    content = {
                        <div>
                            {lines.map((line, index) => (
                                <div key={index} className="flex justify-between items-center border-b py-2">
                                    <div>{line.text}</div>
                                    <div>{line.icon}</div>
                                </div>
                            ))}
                        </div>
                    }
                />
            </Background>
            <ModalDepartamentos 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={addLine}
            />
        </div>
    )
}

export default Departamentos;