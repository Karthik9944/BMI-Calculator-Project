import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const normalizeUser = (user) => {
  if (!user) return user;

  return {
    ...user,
    bmiHistory: user.bmiHistory || [],
    notifications: user.notifications || []
  };
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers).map(normalizeUser));
    }
    
    if (savedUser) {
      setUser(normalizeUser(JSON.parse(savedUser)));
    }
  }, []);

  const syncUserState = (updatedUsers, updatedCurrentUser) => {
    setUsers(updatedUsers);
    setUser(updatedCurrentUser);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    if (updatedCurrentUser) {
      localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  };

  const signup = (name, email, password) => {
    const userExists = users.find(u => u.email === email);
    
    if (userExists) {
      return { success: false, message: 'User already exists!' };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      bmiHistory: [],
      notifications: []
    };

    const updatedUsers = [...users, newUser];
    syncUserState(updatedUsers, newUser);
    
    return { success: true, message: 'Signup successful!' };
  };

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const normalizedUser = normalizeUser(foundUser);
      setUser(normalizedUser);
      localStorage.setItem('currentUser', JSON.stringify(normalizedUser));
      return { success: true, message: 'Login successful!' };
    } else {
      return { success: false, message: 'Invalid email or password!' };
    }
  };

  const addNotification = ({ title, message, type = 'info' }) => {
    if (!user) return null;

    const newNotification = {
      id: Date.now(),
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = users.map((u) => {
      if (u.id !== user.id) return normalizeUser(u);

      return {
        ...normalizeUser(u),
        notifications: [newNotification, ...((u.notifications || []).slice(0, 19))]
      };
    });

    const updatedCurrentUser = updatedUsers.find((u) => u.id === user.id);
    syncUserState(updatedUsers, updatedCurrentUser);
    return newNotification;
  };

  const markNotificationAsRead = (notificationId) => {
    if (!user) return;

    const updatedUsers = users.map((u) => {
      if (u.id !== user.id) return normalizeUser(u);

      return {
        ...normalizeUser(u),
        notifications: (u.notifications || []).map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      };
    });

    const updatedCurrentUser = updatedUsers.find((u) => u.id === user.id);
    syncUserState(updatedUsers, updatedCurrentUser);
  };

  const markAllNotificationsAsRead = () => {
    if (!user) return;

    const updatedUsers = users.map((u) => {
      if (u.id !== user.id) return normalizeUser(u);

      return {
        ...normalizeUser(u),
        notifications: (u.notifications || []).map((notification) => ({
          ...notification,
          read: true
        }))
      };
    });

    const updatedCurrentUser = updatedUsers.find((u) => u.id === user.id);
    syncUserState(updatedUsers, updatedCurrentUser);
  };

  const addBMIHistory = (record) => {
    if (!user) return;

    const newRecord = {
      id: Date.now(),
      ...record,
      calculatedAt: new Date().toISOString()
    };

    const updatedUsers = users.map((u) => {
      if (u.id !== user.id) return normalizeUser(u);

      const existingHistory = u.bmiHistory || [];
      const existingNotifications = u.notifications || [];

      return {
        ...normalizeUser(u),
        bmiHistory: [newRecord, ...existingHistory],
        notifications: [
          {
            id: Date.now() + 1,
            title: 'BMI RECORDED',
            message: `BMI ${newRecord.bmi} saved as ${newRecord.category}`,
            type: 'bmi',
            read: false,
            createdAt: newRecord.calculatedAt
          },
          ...existingNotifications.slice(0, 19)
        ]
      };
    });

    const updatedCurrentUser = updatedUsers.find((u) => u.id === user.id);
    syncUserState(updatedUsers, updatedCurrentUser);
  };

  const logout = () => {
    syncUserState(users, null);
  };

  const value = {
    user,
    signup,
    login,
    logout,
    addBMIHistory,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
