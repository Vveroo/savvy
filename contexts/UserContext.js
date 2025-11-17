import React, { createContext, useState, useContext } from 'react';

// Crea el contexto. Inicializamos con un valor que ayuda a la detección de errores.
const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
    // Estado para almacenar la información del único usuario logueado
    const [user, setUser] = useState(null); 
    
    // Estado para almacenar el saldo del usuario. Es modificable por setSaldo.
    const [saldo, setSaldo] = useState(0.00); 
    
    // Estado para indicar si la aplicación está en proceso de autenticación o carga inicial.
    const [isLoading, setIsLoading] = useState(false); 

    /**
     * Función que se llama tras un login exitoso.
     * @param {Object} userData - Los datos del alumno devueltos por la API (nome, matricula, etc.)
     */
    const login = (userData) => {
        setUser(userData);
        // Podrías inicializar el saldo aquí si la API lo devuelve
        setSaldo(10.50); // Ejemplo de saldo inicial
    };

    // Función para cerrar sesión
    const logout = () => {
        setUser(null);
        setSaldo(0.00);
    };

    return (
        <UserContext.Provider value={{ 
            user, 
            login, 
            logout, 
            saldo, 
            setSaldo, // Exportamos setSaldo (clave para recargas o compras de tickets)
            isLoading, // Exportamos isLoading
            setIsLoading // Exportamos la función para cambiar el estado de carga
        }}>
             {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para usar el contexto fácilmente
export const useUserContext = () => {
    const context = useContext(UserContext);

    // Guardrail: Útil para detectar si el contexto no fue envuelto correctamente
    if (context === undefined) {
        throw new Error('useUserContext debe ser usado dentro de un UserProvider');
    }
    return context;
};