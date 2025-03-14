
export interface Professional {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  experience: string;
  specialties: string[];
  available: boolean;
}

export const professionals: Professional[] = [
  {
    id: '1',
    name: 'Ana Silva',
    role: 'Hair Stylist Senior',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    rating: 4.9,
    experience: '8 anos',
    specialties: ['Cortes', 'Coloração', 'Penteados'],
    available: true,
  },
  {
    id: '2',
    name: 'Carlos Oliveira',
    role: 'Barbeiro',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    rating: 4.7,
    experience: '5 anos',
    specialties: ['Cortes Masculinos', 'Barba', 'Penteados'],
    available: true,
  },
  {
    id: '3',
    name: 'Júlia Santos',
    role: 'Esteticista',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80',
    rating: 4.8,
    experience: '7 anos',
    specialties: ['Limpeza de Pele', 'Tratamentos Faciais'],
    available: true,
  },
  {
    id: '4',
    name: 'Ricardo Almeida',
    role: 'Hair Stylist',
    image: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    rating: 4.6,
    experience: '4 anos',
    specialties: ['Cortes', 'Coloração', 'Tratamentos'],
    available: true,
  },
  {
    id: '5',
    name: 'Fernanda Lima',
    role: 'Manicure & Pedicure',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
    rating: 4.9,
    experience: '6 anos',
    specialties: ['Manicure', 'Pedicure', 'Unhas em Gel'],
    available: true,
  },
  {
    id: '6',
    name: 'Pedro Costa',
    role: 'Maquiador',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    rating: 4.7,
    experience: '5 anos',
    specialties: ['Maquiagem Social', 'Maquiagem para Noivas'],
    available: false,
  }
];
