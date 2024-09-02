import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import Background from "../components/background";
import { GrAdd, GrMoreVertical } from "react-icons/gr";
import MainContainer from "../components/mainContainer";
import ModalUsers from "../components/modalUsers"; 
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const handleSaveUser = (user) => {
    setUsers([...users, user]);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://tetochat-8m0r.onrender.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Header />
      <Background
        text="Usuários"
        btn1={<GrAdd onClick={() => setIsModalOpen(true)} />}
      >
        <MainContainer
          p1="Nome"
          p2="Email"
          p3="Cargo"
          p4="Departamento"
          p6="Ações"
          content={
            <div className="w-full">
              {users.map((user) => (
                <div key={user.id} className="flex items-center py-2 border-b">
                  <div className="w-1/5 px-2">{user.name}</div>
                  <div className="w-1/5 px-0">{user.email}</div>
                  <div className="w-1/5 px-2">{user.position}</div>
                  <div className="w-1/5 px-2">{user.department}</div>
                  <div className="w-1/5 flex justify-end px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 rounded">
                        <GrMoreVertical className="cursor-pointer" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white text-black mt-2 w-48">
                        <DropdownMenuItem className="hover:bg-gray-200 text-center">
                          <p>Editar</p>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          }
        />
      </Background>
      <ModalUsers
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
      />
    </div>
  );
}

export default Users;
