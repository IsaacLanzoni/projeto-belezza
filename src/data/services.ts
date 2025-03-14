
export interface Service {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  featured: boolean;
}

export const serviceCategories = [
  { id: 'all', name: 'Todos' },
  { id: 'hair', name: 'Cabelo' },
  { id: 'nails', name: 'Unhas' },
  { id: 'makeup', name: 'Maquiagem' },
  { id: 'treatments', name: 'Tratamentos' },
];

export const services: Service[] = [
  {
    id: '1',
    category: 'hair',
    name: 'Corte Feminino',
    description: 'Corte profissional feminino, inclui lavagem e finalização.',
    price: 120,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    featured: true,
  },
  {
    id: '2',
    category: 'hair',
    name: 'Corte Masculino',
    description: 'Corte profissional masculino com acabamento perfeito.',
    price: 80,
    duration: 45,
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    featured: false,
  },
  {
    id: '3',
    category: 'hair',
    name: 'Coloração Completa',
    description: 'Coloração profissional com produtos de alta qualidade.',
    price: 200,
    duration: 120,
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    featured: true,
  },
  {
    id: '4',
    category: 'nails',
    name: 'Manicure Completa',
    description: 'Tratamento completo para unhas, incluindo cutículas e esmaltação.',
    price: 70,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1607779097040-26e60c0448f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    featured: false,
  },
  {
    id: '5',
    category: 'nails',
    name: 'Pedicure Completa',
    description: 'Tratamento completo para os pés, incluindo esfoliação e esmaltação.',
    price: 85,
    duration: 75,
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    featured: false,
  },
  {
    id: '6',
    category: 'makeup',
    name: 'Maquiagem Social',
    description: 'Maquiagem profissional para eventos e ocasiões especiais.',
    price: 150,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    featured: true,
  },
  {
    id: '7',
    category: 'makeup',
    name: 'Maquiagem para Noivas',
    description: 'Maquiagem especial para noivas com teste incluído.',
    price: 300,
    duration: 90,
    image: 'https://images.unsplash.com/photo-1457972851104-4fd469440bf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    featured: false,
  },
  {
    id: '8',
    category: 'treatments',
    name: 'Hidratação Profunda',
    description: 'Tratamento intensivo para hidratação dos fios com produtos especiais.',
    price: 130,
    duration: 90,
    image: 'https://images.unsplash.com/photo-1526045566106-788ca4fa9335?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    featured: false,
  },
  {
    id: '9',
    category: 'treatments',
    name: 'Tratamento Facial',
    description: 'Limpeza de pele profunda com produtos anti-idade.',
    price: 180,
    duration: 90,
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    featured: true,
  },
];
