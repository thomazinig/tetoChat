import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from '../components/header';
import Background from '../components/background';
import { GrAdd, GrMoreVertical } from 'react-icons/gr';
import MainContainer from '../components/mainContainer';
import ModalQuickResponses from "../components/modalQuickResponses";

interface QuickResponse {
    id: number;
    text: string;
    department: string;
}

const QuickResponses: React.FC = () => {
    const [quickResponses, setQuickResponses] = useState<QuickResponse[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchQuickResponses = async () => {
            try {
                const response = await axios.get('http://localhost:3005/quickResponses');
                setQuickResponses(response.data);
            } catch (error) {
                console.error('Erro ao buscar respostas rápidas:', error);
            }
        };

        fetchQuickResponses();
    }, []);

    const addQuickResponse = async (text: string, department: string) => {
        try {
            const response = await axios.post('http://localhost:3005/quickResponses', { text, department });
            setQuickResponses([...quickResponses, response.data]);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Erro ao salvar resposta rápida:', error);
        }
    };

    return (
        <div>
            <Header />
            <Background
                text="Respostas Rápidas"
                btn1={<GrAdd onClick={() => setIsModalOpen(true)} />}
            >
                <MainContainer
                    p1="Mensagem"
                    p6="Ações"
                    content={
                        <div>
                            {quickResponses.map((response) => (
                                <div key={response.id} className="flex justify-between items-center border-b py-2">
                                    <div>{response.text} ({response.department})</div>
                                    <div><GrMoreVertical /></div>
                                </div>
                            ))}
                        </div>
                    }
                />
            </Background>
            <ModalQuickResponses
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={addQuickResponse}
            />
        </div>
    )
}

export default QuickResponses;
