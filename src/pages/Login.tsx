
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthSideBanner from '@/components/auth/AuthSideBanner';

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <Layout withFooter={false}>
      <div className="min-h-screen flex items-center justify-center p-4 bg-secondary/30">
        <div className="grid md:grid-cols-2 gap-0 w-full max-w-5xl overflow-hidden rounded-2xl shadow-xl">
          <motion.div 
            className="bg-white p-8 md:p-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <AuthHeader isLoginTab={activeTab === 'login'} />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Cadastro</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </motion.div>

          <AuthSideBanner />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
